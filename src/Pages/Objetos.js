import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Observacoes from './Observacoes';
import { AuthContext } from '../Context/AuthContext';

export default function Objetos({ nome, cor, observacao, local, foto, dtDesaparecimento, dtEncontro, status }) {
  const { exibirobservacao, setExibirObservacao, toggleObs} = useContext(AuthContext)

  function TrocarObs()
  {
    toggleObs();
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{nome}</Text>
      <Image source={{ uri: foto }} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#545454",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    margin: 10,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#161616',
    marginBottom: 10,
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "gray",
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161616',
    marginBottom: 5,
  },

  button: {
    backgroundColor: '#4BBEE7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
