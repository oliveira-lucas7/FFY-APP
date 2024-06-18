import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Observacao from './Observacoes';

export default function Animais({ handle, objeto, handle2 }) {

  const fade = useRef(new Animated.Value(0)).current;

  const [criaobs, setCriaObs] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start()
    }, [])
  );
  function criarobservação() {
    setCriaObs(true)
  }

  return (
    <Animated.View style={{ opacity: fade, backgroundColor: "#000" }}>
      {criaobs == false ?
        <View style={styles.container}>
          <View style={styles.productInfo}>
            <Text style={styles.title}>Nome: {objeto.objetoNome}</Text>
            <Image source={{ uri: objeto.objetoFoto }} style={styles.image} />
            <Text style={styles.info}><Text style={styles.bold}>Obs:</Text> {objeto.objetoObservacao}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Local Desaparecimento:</Text> {objeto.objetoLocalDesaparecimento}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Cor:</Text> {objeto.objetoCor}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Data de Desaparecimento:</Text>{objeto.objetoDtDesaparecimento}</Text>
            <Text style={styles.info}><Text style={styles.bold}>Data de Encontro:</Text> {objeto.objetoDtEncontro} </Text>
            <Text style={styles.info}><Text style={styles.bold}>Status do Objeto:</Text> {objeto.objetoStatus}</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handle(false)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={criarobservação}>
              <Text style={styles.buttonText}>Criar observação</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <Observacao handle2={setCriaObs} />
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 40,
    marginHorizontal: 20,
    color: "white",
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    height: "97.5%",
  },
  productInfo: {
    alignItems: 'left',
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 10,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  info: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  buttonContainer: {
    backgroundColor: '#4BBEE7',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 10,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});