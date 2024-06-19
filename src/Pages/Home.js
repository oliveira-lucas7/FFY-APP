import { View, Text, StyleSheet, Alert, ActivityIndicator, FlatList, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Objetos from './Objetos';
import { AuthContext } from '../Context/AuthContext';
import Observacao from './Observacoes';
import Detalhes from './Detalhes'

export default function Home() {
  const [objetos, setObjetos] = useState([]);
  const [error, setError] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const [nameId, setNameId] = useState(null);

  const [exibirobservacao, setExibirObservacao] = useState(false)
  const [exibirObjetos, setExibirObjetos] = useState(false)
  const[ exibirDetalhes, setExibirDetalhes] = useState(false)


  const [ objeto, setObjeto] = useState()

  async function getObjetos() {
    try {
      const response = await fetch('http://10.139.75.33:5251/api/Objeto/GetAllStatus1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        setObjetos(json);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getObjetos();
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, [fade])
  );
  function exibirDetalhesdoobjeto(item){
    setExibirDetalhes(true)
    setObjeto(item)
  }



  return (
    <Animated.View style={{ opacity: fade}}>
      {!exibirDetalhes ? 
      <View style={styles.container}>
        <View style={styles.containerProducts}>
          <Text style={styles.products}>Objetos Perdidos</Text>
        </View>
        {error ? (
          <Text style={styles.errorText}>Erro ao carregar objetos</Text>
        ) : objetos.length > 0 ? (
          <FlatList
            data={objetos}
            renderItem={({ item }) => (
              <View style={styles.containerObjetos}>
                <Objetos
                  id={item.id}
                  nome={item.objetoNome}
                  cor={item.objetoCor}
                  foto={item.objetoFoto}
                  observacao={item.objetoObservacao}
                  local={item.objetoLocalDesaparecimento}
                  dtDesaparecimento={item.objetoDtDesaparecimento}
                  dtEncontro={item.objetoDtEncontro}
                  status={item.objetoStatus}
                />
                <TouchableOpacity style={styles.button} onPress={() => exibirDetalhesdoobjeto(item)}>
                  <Text style={styles.buttonText}>Detalhes</Text>
                </TouchableOpacity>
            </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </View>
      :
        <Detalhes handle={setExibirDetalhes} objeto={objeto}/>
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  products: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white",
  },
  containerProducts: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  button: {
    color: "white",
    backgroundColor: "#4BBEE7",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 10,
    width: "90%",
    borderRadius: 5
  },
  containerObjetos: {
    backgroundColor: "#000",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // marginTop: -10
  }
});
