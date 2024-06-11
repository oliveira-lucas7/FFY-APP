import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, ScrollView, TextInput, StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'; // Import navigation

export default function AdicionarObjeto() {
  const navigation = useNavigation(); // Initialize navigation
  const [userId, setUserId] = useState(null);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [local, setLocal] = useState("");
  const [foto, setFoto] = useState("");
  const [desaparecimento, setDesaparecimento] = useState(new Date());
  const [encontro, setEncontro] = useState(new Date());
  const [status, setStatus] = useState("");
  const [showDesaparecimentoPicker, setShowDesaparecimentoPicker] = useState(false);
  const [showEncontroPicker, setShowEncontroPicker] = useState(false);
  const [erro, setErro] = useState(false); // Adiciona o estado de erro

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert("Erro", "ID do usuário não encontrado");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserId();
  }, []);

  async function Cadastro() {
    try {
      const formattedDesaparecimento = format(desaparecimento, "yyyy-MM-dd'T'HH:mm:ss");
      const formattedEncontro = format(encontro, "yyyy-MM-dd'T'HH:mm:ss");

      const response = await fetch('http://10.139.75.17:5251/api/Objeto/CreateObjeto', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ObjetoNome: nome,
          ObjetoCor: cor,
          ObjetoObservacao: observacao,
          ObjetoLocalDesaparecimento: local,
          ObjetoFoto: foto,
          ObjetoDtDesaparecimento: formattedDesaparecimento,
          ObjetoDtEncontro: formattedEncontro,
          ObjetoStatus: status,
          UsuarioId: userId,
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      const json = await response.json();

      if (json.id) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate('Home', { refresh: true }); // Navigate to Home and trigger refresh
      } else {
        throw new Error('Erro ao cadastrar');
      }
    } catch (error) {
      setErro(true); // Define o erro para true
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.forms}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../../images/LogoTec.png')} />
      </View>
      <View>
        <Text style={styles.textTitle}>Cadastro de Objeto</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setNome(digitado)}
            value={nome}
            inputMode='text'
            placeholder="Objeto"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setCor(digitado)}
            value={cor}
            inputMode='text'
            placeholder="Cor"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setObservacao(digitado)}
            value={observacao}
            inputMode='text'
            placeholder="Observação"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setLocal(digitado)}
            value={local}
            inputMode='text'
            placeholder="Local que perdeu"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setFoto(digitado)}
            value={foto}
            inputMode='text'
            placeholder="Url da imagem"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(digitado) => setStatus(digitado)}
            value={status}
            inputMode='text'
            placeholder="Status"
            placeholderTextColor='white'
          />
        </View>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDesaparecimentoPicker(true)}
        >
          <Text style={styles.datePickerText}>Selecionar Data e Hora do Desaparecimento</Text>
        </TouchableOpacity>
        {showDesaparecimentoPicker && (
          <DateTimePicker
            value={desaparecimento}
            mode="time"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowDesaparecimentoPicker(false);
              if (selectedDate) {
                setDesaparecimento(selectedDate);
                setShowEncontroPicker(true);
              }
            }}
          />
        )}
        {showEncontroPicker && (
          <DateTimePicker
            value={encontro}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEncontroPicker(false);
              if (selectedDate) {
                setEncontro(selectedDate);
              }
            }}
          />
        )}
        <TouchableOpacity style={styles.cadastro} onPress={Cadastro}>
          <Text style={styles.cadastroText}>Cadastrar</Text>
        </TouchableOpacity>
        {erro && <Text style={styles.errorText}>Revise cuidadosamente todos os campos</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#595959",
    color: "white"
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginTop: 15
  },
  image: {
    width: "90%",
    height: 130
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginTop: 50
  },
  datePickerButton: {
    backgroundColor: "#4BBEE7",
    width: "100%",
    padding: 15,
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerText: {
    color: 'white',
    fontSize: 16,
  },
  forms: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.94,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 35,
    display: "flex",
    flexDirection: "column"
  },
  cadastro: {
    backgroundColor: "#4BBEE7",
    color: "white",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    height: 60,
    display: "flex",
    margin: 'auto',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  cadastroText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  textErro: {
    marginBottom: 20,
  }
});
