import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Observacao({ handle2, item }) {
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');
  const [observacaoData, setObservacaoData] = useState(new Date());
  const [objetoId, setObjetoId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [showObservacaoPicker, setShowObservacaoPicker] = useState(false);

  async function handleSubmit() {
    if (!observacaoDescricao || !observacaoLocal || !observacaoData || !objetoId || !usuarioId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      setErro(true);
      return;
    }

    const dataFormatada = observacaoData.toISOString();
    const storedUserId = await AsyncStorage.getItem('userId');
    const storedObjetoId = await AsyncStorage.getItem('objetoId');

    await fetch('http://10.139.75.33:5251/api/Observacoes/CreateObservacao', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        observacaoDescricao: observacaoDescricao,
        observacaoLocal: observacaoLocal,
        observacaoData: dataFormatada, 
        objetoId: objetoId,
        usuarioId: storedUserId,
        objetoId: item.objetoId,
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log('Nova observação:', data);
        setSucesso(true);
        handle2(false);
        limparCampos();
        Alert.alert('Sucesso', 'Observação cadastrada com sucesso!');
      } else {
        setErro(true);
        Alert.alert('Erro', 'Falha ao cadastrar observação.');
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      setErro(true);
    });
  }

  function limparCampos() {
    setObservacaoDescricao('');
    setObservacaoLocal('');
    setObservacaoData(new Date());
    setObjetoId('');
    setUsuarioId('');
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.box}>
        <Text style={styles.observar}>Observação</Text>
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
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowObservacaoPicker(true)}
        >
          <Text style={styles.datePickerText}>
            {observacaoData ? observacaoData.toLocaleDateString() : 'Selecionar Data e Hora da Observação'}
          </Text>
        </TouchableOpacity>
        {showObservacaoPicker && (
          <DateTimePicker
          style={styles.date}
            value={observacaoData}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowObservacaoPicker(false);
              if (selectedDate) {
                setObservacaoData(selectedDate);
              }
            }}
          />
        )}
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
