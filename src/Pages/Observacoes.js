import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,  } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Observacao({ handle2, objeto2, objetoId }) {
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');
  const [observacaoData, setObservacaoData] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [userId, setUserId] = useState("")

  const {usuarioId, usuarioNome} = useContext(AuthContext);

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

  async function handleSubmit() {
    const dataFormatada = formatarData(observacaoData);
    
    try {
      const response = await fetch('http://10.139.75.33:5251/api/Observacoes/CreateObservacoes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          observacoesDescricao: observacaoDescricao,
          observacoesLocal: observacaoLocal,
          observacoesData: dataFormatada, 
          objetoId: objeto2.objetoId,
          usuarioId: userId
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Nova observação:', data);
        setSucesso(true);
        handle2(false);
        limparCampos();
        Alert.alert('Sucesso', 'Observação cadastrada com sucesso!');
      } else {
        console.error('Erro no servidor:', data);
        setErro(true);
        Alert.alert('Erro', 'Falha ao cadastrar observação.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
      setErro(true);
      Alert.alert('Erro', 'Falha ao cadastrar observação.');
    }
  }

  function formatarData(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
      const dia = partes[0];
      const mes = partes[1];
      const ano = partes[2];
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  function limparCampos() {
    setObservacaoDescricao('');
    setObservacaoLocal('');
    setObservacaoData('');
    setAnimalId('');
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.box}>
        {/* <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoDescricao(text)}
          value={observacaoDescricao}
          placeholder="Descreva a observação"
        />
        <Text style={styles.label}>Local:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoLocal(text)}
          value={observacaoLocal}
          placeholder="Informe o local da observação"
        /> */}
        <Text style={styles.observar}>Observação: {objeto2.objetoNome}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoDescricao(text)}
          value={observacaoDescricao}
          placeholder="Descreva a observação"
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoLocal(text)}
          value={observacaoLocal}
          placeholder="Informe o local da observação"
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoData(text)}
          value={observacaoData}
          placeholder="dd/mm/yyyy"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar Observação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handle2(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
    width: "100%",
  },
  box: {
    width: '100%',
    height: '100%',
    marginTop: 120,
    alignItems: 'center',
    backgroundColor: "#161616",
    position: "absolute"
  },
  date: {
    marginTop: 55
  },
  label: {
    fontSize: 16,
    color: "white"
  },
  observar: {
    fontSize: 22,
    color: "white",
    marginBottom: 10
  },
  input: {
    width: '90%',
    height: 70,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#595959",
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  datePickerButton: {
    backgroundColor: "#4BBEE7",
    width: "90%",
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
  buttonContainer: {
    backgroundColor: '#4BBEE7',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,
    height: 50,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
