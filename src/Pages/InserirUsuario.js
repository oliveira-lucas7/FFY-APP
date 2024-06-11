import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

export default function InserirUsuario({ navigation }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const{ RealizaCadastro, error, sucessCadastro, toggleScreen, cadastro} = useContext(AuthContext)

  function Cadastro()
  {
    RealizaCadastro(email, nome, senha, telefone)
  }


  return (
    <ScrollView contentContainerStyle={styles.forms}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../../images/LogoTec.png')} />
      </View>
      <>
        {sucesso ? (
          <View style={styles.container}>
            <Text>Obrigado por se cadastrar! Seu cadastro foi realizado com sucesso!</Text>
          </View>
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
                  placeholder="Seu nome"
                  placeholderTextColor='white'
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(digitado) => setEmail(digitado)}
                  value={email}
                  inputMode='text'
                  placeholder="Seu email"
                  placeholderTextColor='white'
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(digitado) => setSenha(digitado)}
                  value={senha}
                  inputMode='text'
                  placeholder="Sua senha"
                  placeholderTextColor='white'
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(digitado) => setTelefone(digitado)}
                  value={telefone}
                  inputMode='text'
                  placeholder="Seu telefone"
                  placeholderTextColor='white'
                />
              </View>
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
    marginTop: 130
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
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
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
