import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, ScrollView, TextInput, StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native'; 

export default function CadastroObservacoes() {
  const navigation = useNavigation(); 
  const route = useRoute();

  const [userId, setUserId] = useState(null);
  const [objetoId, setObjetoId] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState(new Date());

  const [showDesaparecimentoPicker, setShowDesaparecimentoPicker] = useState(false);
  const [erro, setErro] = useState(false); 

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

    if (route.params && route.params.objetoId) {
      setObjetoId(route.params.objetoId);
    }
  }, [route.params]);

  async function Cadastro() {
    try {
      const formattedData = format(data, "yyyy-MM-dd'T'HH:mm:ss");

      const response = await fetch('http://10.139.75.33:5251/api/Observacoes/CreateObservacoes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ObservacoesDescricao: descricao,
          ObservacoesLocal: local,
          ObservacoesData: formattedData,
          UsuarioId: userId,
          ObjetoId: objetoId,
        })
      });

      const json = await response.json();

      if (!response.ok) {
        console.error('Resposta não ok:', json);
        throw new Error('Erro ao cadastrar');
      }

      if (json && json.observacoesId) { 
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate('Home', { refresh: true }); 

        setDescricao("");
        setLocal("");
        setData(new Date());
        setErro(false);
      } else {
        console.error('JSON inesperado:', json);
        throw new Error('Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro no catch:', error);
      setErro(true);
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.forms}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../../images/LogoTec.png')} />
      </View>
      <View>
        <Text style={styles.textTitle}>Cadastro de Observações</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
            placeholderTextColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setLocal}
            value={local}
            placeholder="Local"
            placeholderTextColor='white'
          />
        </View>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDesaparecimentoPicker(true)}
        >
          <Text style={styles.datePickerText}>Selecionar Data e Hora</Text>
        </TouchableOpacity>
        {showDesaparecimentoPicker && (
          <DateTimePicker
            value={data}
            mode="datetime"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowDesaparecimentoPicker(false);
              if (selectedDate) {
                setData(selectedDate);
              }
            }}
          />
        )}
        <TouchableOpacity style={styles.cadastro} onPress={Cadastro}>
          <Text style={styles.cadastroText}>Cadastrar Observação</Text>
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
    marginTop: 150
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
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  textErro: {
    marginBottom: 20,
  }
});
