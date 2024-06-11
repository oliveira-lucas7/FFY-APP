import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, Platform } from 'react-native';
import { View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AdicionarObjeto() {
  const [userId, setUserId] = useState(null);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [local, setLocal] = useState("");
  const [foto, setFoto] = useState("");
  const [desaparecimento, setDesaparecimento] = useState(new Date());
  const [encontro, setEncontro] = useState(new Date());
  const [status, setStatus] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [showDesaparecimentoPicker, setShowDesaparecimentoPicker] = useState(false);
  const [showEncontroPicker, setShowEncontroPicker] = useState(false);

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

  const showDesaparecimentoPickerHandler = () => {
    setShowDesaparecimentoPicker(true);
  };

  const showEncontroPickerHandler = () => {
    setShowEncontroPicker(true);
  };

  const desaparecimentoChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || desaparecimento;
    setShowDesaparecimentoPicker(Platform.OS === 'ios');
    setDesaparecimento(currentDate);
  };

  const encontroChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || encontro;
    setShowEncontroPicker(Platform.OS === 'ios');
    setEncontro(currentDate);
  };

  async function Cadastro() {
    try {
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
          ObjetoDtDesaparecimento: desaparecimento.toISOString(),
          ObjetoDtEncontro: encontro.toISOString(),
          ObjetoStatus: status,
          UsuarioId: userId,
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      const json = await response.json();

      if (json.id) {
        setSucesso(true);
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      } else {
        throw new Error('Erro ao cadastrar');
      }
    } catch (error) {
      setErro(true);
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.forms}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../../images/LogoTec.png')} />
      </View>
      <>
        {sucesso ? (
          <Text>Obrigado por cadastrar seu objeto!</Text>
        ) : (
          <>
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
                <TouchableOpacity onPress={showDesaparecimentoPickerHandler}>
                  <Text style={styles.datePickerText}>
                    Data de desaparecimento: {desaparecimento.toLocaleString()}
                  </Text>
                </TouchableOpacity>
                {showDesaparecimentoPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={desaparecimento}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={desaparecimentoChangeHandler}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={showEncontroPickerHandler}>
                  <Text style={styles.datePickerText}>
                    Data de encontro: {encontro.toLocaleString()}
                  </Text>
                </TouchableOpacity>
                {showEncontroPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={encontro}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={encontroChangeHandler}
                  />
                )}
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
              <TouchableOpacity style={styles.cadastro} onPress={Cadastro}>
                <Text style={styles.cadastroText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            <View style={
styles.textErro}>
{erro && <Text style={styles.errorText}>Revise cuidadosamente todos os campos</Text>}
</View>
</>
)}
</>
</ScrollView>
);
}

const styles = StyleSheet.create({
inputContainer: {
width: '100%',
marginBottom: 20,
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
input: {
width: '100%',
height: 60,
padding: 10,
borderRadius: 3,
backgroundColor: "#595959",
color: "white"
},
datePickerText: {
color: 'white',
marginBottom: 10,
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
marginTop: 5,
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
marginTop: 50,
},
textErro: {
marginBottom: 150,
}
});
