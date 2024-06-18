import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Observacao({ handle2, item }) {
  const [observacaoDescricao, setObservacaoDescricao] = useState('');
  const [observacaoLocal, setObservacaoLocal] = useState('');
  const [observacaoData, setObservacaoData] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  async function handleSubmit() {
    if (!observacaoDescricao || !observacaoLocal || !observacaoData || !animalId || !usuarioId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      setErro(true);
      return;
    }

    // Formatar a data para o formato esperado pela API (yyyy-MM-dd)
    const dataFormatada = formatarData(observacaoData);

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
        usuarioId: usuarioId
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
    setObservacaoData('');
    setAnimalId('');
    setUsuarioId('');
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.box}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
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
        />
        <Text style={styles.label}>Data (dd/mm/yyyy):</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setObservacaoData(text)}
          value={observacaoData}
          placeholder="Informe a data da observação"
        />
        <Text style={styles.label}>ID do Animal:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAnimalId(text)}
          value={animalId}
          placeholder="Informe o ID do animal"
        />
        <Text style={styles.label}>ID do Usuário:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsuarioId(text)}
          value={usuarioId}
          placeholder="Informe o ID do usuário"
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
    backgroundColor: "red",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
    width: "100%",
    position: "absolute"
  },
  box: {
    width: '100%',
    height: '100%',
    marginTop: 130,
    alignItems: 'center',
    backgroundColor: "white",
     position: "absolute"
  },
  label: {
    fontSize: 16,
    color: "red"
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
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