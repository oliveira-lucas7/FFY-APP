import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(false);

    const {Login, error} = useContext( AuthContext );

    function RealizaLogin()
    {
        Login( email, senha );
    }

    return (
        <> 
            <ScrollView contentContainerStyle={styles.forms}>
                <View style={styles.containerImage}>
                    <Image style={styles.image}
                        source={require('../../images/LogoTec.png')}
                        />
                </View> 
                    <View style={styles.container}>
                        {/* <Text style={styles.textLogin}>Login</Text> */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(digitado) => setEmail(digitado)}
                            value={email}
                            inputMode='text'
                            placeholder="Seu Email"
                            placeholderTextColor='white'
                        />
                        <TextInput
                            placeholder="Sua Senha"
                            style={styles.input}
                            onChangeText={(digitado) => setSenha(digitado)}
                            value={senha}
                            secureTextEntry={true}
                            placeholderTextColor='white'
                        />
                        <View style={styles.textSenha}>
                            <TouchableOpacity>
                                <Text style={styles.recursoSenha}>Esqueci a senha</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.login} onPress={RealizaLogin}>
                            <Text style={styles.btnText}>Entrar</Text>
                        </TouchableOpacity>
                        <View style={styles.textCadastro}>
                            <TouchableOpacity>
                                <Text style={styles.recurso}>Não tem uma conta? Cadastre-Se!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {error && (
                        <View style={styles.erro}>
                            <Text style={styles.erroText}>Revise os campos e tente novamente</Text>
                        </View>
                    )}
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "90%",
        display: "flex",
        alignItems: "center",
        marginTop: "6%",
    },
    textCadastro:{
        marginTop: 20,
        alignItems: "center",
    },
    image: {
        width: "90%",
        height: 130
    },
    containerImage: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: "100%"
    },
    textSenha: {
        display: "flex",
        alignItems: "flex-end",
        textAlign: "left",
        width: "95%",
        marginBottom: 10
    },
    textLogin: {
        fontSize: 25,
        color: "white",
        paddingBottom: 15
    },
    recurso: {
        color: "white",
        paddingTop: 15
    },
    recursoSenha: {
        color: "white",
        paddingTop: 15
    },
    input: {
        width: "100%",
        height: 60,
        // borderBottomWidth: 2,
        padding: 10,
        borderRadius: 7,
        marginVertical: 10,
        display: "flex",
        backgroundColor: "#595959",
        color: "white"
    },
    forms: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "black",
        opacity: 0.94
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    login: {
        backgroundColor: "#4BBEE7",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        height: 60,
        display: "flex",
        margin: 'auto',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        // elevation: 3,
    },   
    erro: {
        width: "90%",
        marginTop: "10%",
        display: "flex",
        textAlign: "center",
        alignItems: "center"
    },
    erroText: {
        color: "red",
        fontSize: 16
    }
})