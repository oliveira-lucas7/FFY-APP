import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AllUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(false);
    const [busca, setBusca] = useState("");
    const [edicao, setEdicao] = useState(false);
    const [filtro, setFiltro] = useState();
    const [idUser, setIdUser] = useState([]);
    const [userNome, setUserNome] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userSenha, setUserSenha] = useState();

    async function getUsuarios() {
        await fetch('http://10.139.75.36:5251/api/Users/GetAllUsers', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => (res.ok == true) ? res.json() : false)
            .then(json => setUsuarios(json))
            .catch(err => setError(true))
    }

    useEffect(() => {
        getUsuarios();
    }, [])

    useEffect(() => {
        setFiltro(usuarios.filter((item) => item.name.firstname == busca)[0])
    }, [busca])

    return (
        <View style={styles.container}>
            {edicao == false ? 
            <FlatList
                style={styles.flat}
                data={usuarios}
                keyExtractor={(item) => item.UserId}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text style={styles.text}>
                            {item.userName}
                        </Text>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.btnLoginText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDelete}>
                            <Text style={styles.btnLoginText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            :
            <Text style={styles.editModeText}>Modo de edição ativado</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161616",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flat: {
        width: '100%',
    },
    text: {
        fontSize: 20,
        color: '#007aff',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnEdit: {
        backgroundColor: '#007aff',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    btnDelete: {
        backgroundColor: '#ff3b30',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
    },
    editModeText: {
        fontSize: 20,
        color: '#ff3b30',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "100%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: '#e0f7fa',
    },
    input: {
        color: "#000",
        flex: 1,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    cardContainer: {
        marginTop: 20,
    },
    cardTitle: {
        color: "#007aff",
        fontSize: 27,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 'bold',
    },
    cardText: {
        color: "#007aff",
        fontSize: 16,
        marginBottom: 5,
        textAlign: "center",
    },
    image: {
        width: "90%",
        height: 130
    },
    containerImage: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: "100%",
        marginTop: 60
    },
});