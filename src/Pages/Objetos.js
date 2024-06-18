import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function Objetos({ nome, cor, observacao, local, foto, dtDesaparecimento, dtEncontro, status }) {
  const [modalVisible, setModalVisible] = useState(false);

  console.log(nome, cor, observacao, local, foto, dtDesaparecimento, dtEncontro, status)
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{nome}</Text>
      <Image source={{ uri: foto }} style={styles.img} />
      <Text style={styles.status}>Situação: {status}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Detalhes</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Objeto</Text>
            <Text style={styles.cor}>Cor: {cor}</Text>
            <Text style={styles.modalText}>Local que foi perdido: {local}</Text>
            <Text style={styles.modalText}>Observação: {observacao}</Text>
            <Text style={styles.modalText}>Data de Desaparecimento: {dtDesaparecimento}</Text>
            <Text style={styles.modalText}>Data de Encontro: {dtEncontro}</Text>
            <TouchableOpacity style={styles.buttonClose}>
              <Text style={styles.modalObs}>Observações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: '45%',
    alignItems: 'center',
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
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cor: {
    fontSize: 16,
    color: '#161616',
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161616',
    marginBottom: 5,
  },
  local: {
    fontSize: 14,
    color: '#161616',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: '55%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center', 
  },
  modalClose: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 80
  },
  modalObs: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 58
  },
  button: {
    backgroundColor: '#4BBEE7', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#4BBEE7', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
