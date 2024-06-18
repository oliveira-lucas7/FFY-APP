import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, ScrollView, TextInput, StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

export default function Observacoes() {
  const navigation = useNavigation();
  const route = useRoute();

  const [objetoId, setObjetoId] = useState(null);
  const [observacoes, setObservacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [erro, setErro] = useState(false); 

  useEffect(() => {
    if (route.params && route.params.objetoId) {
      setObjetoId(route.params.objetoId);
      carregarObservacoes(route.params.objetoId);
    }
  }, [route.params]);

  async function carregarObservacoes(objetoId) {
    try {
      // Carregar observações do objeto da API
      const response = await fetch(`http://10.139.75.33:5251/api/Observacoes/GetObservacoesByObjetoId/${objetoId}`);
      const json = await response.json();
      if (!response.ok) {
        console.error('Resposta não ok:', json);
        throw new Error('Erro ao carregar observações');
      }
      setObservacoes(json);
    } catch (error) {
      console.error('Erro ao carregar observações:', error);
      Alert.alert("Erro", "Ocorreu um erro ao carregar as observações.");
    }
  }

  async function cadastrarObservacao() {
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
          ObjetoId: objetoId,
        })
      });

      const json = await response.json();

      if (!response.ok) {
        console.error('Resposta não ok:', json);
        throw new Error('Erro ao cadastrar observação');
      }

      if (json && json.observacoesId) { 
        Alert.alert("Sucesso", "Observação cadastrada com sucesso!");
        setDescricao("");
        setLocal("");
        setData(new Date());
        setErro(false);
        carregarObservacoes(objetoId);
      } else {
        console.error('JSON inesperado:', json);
        throw new Error('Erro ao cadastrar observação');
      }
    } catch (error) {
      console.error('Erro no catch:', error);
      setErro(true);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar a observação. Tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.forms}>
      <View style={styles.container}>
        <FlatList
          data={observacoes}
          keyExtractor={(item) => item.observacoesId.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Descrição: {item.ObservacoesDescricao}</Text>
              <Text style={styles.itemText}>Local: {item.ObservacoesLocal}</Text>
              <Text style={styles.itemText}>Data: {item.ObservacoesData}</Text>
            </View>
          )}
        />
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
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>Selecionar Data e Hora</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="datetime"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setData(selectedDate);
              }
            }}
          />
        )}
        <TouchableOpacity style={styles.cadastro} onPress={cadastrarObservacao}>
          <Text style={styles.cadastroText}>Cadastrar Observação</Text>
        </TouchableOpacity>
        {erro && <Text style={styles.errorText}>Revise cuidadosamente todos os campos</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    marginTop: 35,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.94,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
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
  }
});
