import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native';
import Objetos from './Objetos';

export default function AdicionarObjeto() {

  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [local, setLocal] = useState("");
  const [foto, setFoto] = useState("");
  const [desaparecimento, setDesaparecimento] = useState("");
  const [encontro, setEncontro] = useState("");
  const [status, setStatus] = useState("")
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  async function Cadastro() {
    try {
      const response = await fetch('http://10.139.75.10:5251/api/Objeto/CreateObjeto', {
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
          ObjetoDtDesaparecimento: desaparecimento,
          ObjetoDtEncontro: encontro,
          ObjetoStatus: status,
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
          <Text>Obrigado por se cadastrar! Seu cadastro foi realizado com sucesso!</Text>
        ) : (
          <>
            <View>
              <Text style={styles.textTitle}>Cadastro de Usuário</Text>
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
                  secureTextEntry={true}
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
                  onChangeText={(digitado) => setDesaparecimento(digitado)}
                  value={desaparecimento}
                  inputMode='text'
                  placeholder="Data de desaparecimento"
                  placeholderTextColor='white'
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(digitado) => setEncontro(digitado)}
                  value={encontro}
                  inputMode='text'
                  placeholder="Data de encontro"
                  placeholderTextColor='white'
                  secureTextEntry={true}
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
              {/* Adicione mais campos de entrada conforme necessário */}
              <TouchableOpacity style={styles.cadastro} onPress={Cadastro}>
                <Text style={styles.cadastroText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textErro}>
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
  inputContainerDois: {
    flex: 1,
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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
  inputConjunto: {
    width: '50%',
    height: 60,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#595959",
    color: "white"
  },
  input: {
    width: '100%',
    height: 60,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#595959",
    color: "white"
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
