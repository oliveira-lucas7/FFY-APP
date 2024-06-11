import { View, Text, StyleSheet, ActivityIndicator, FlatList, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import Objetos from './Objetos';

export default function Home() {

  const [objetos, setObjetos] = useState([]);
  const [error, setError] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;

  async function getObjetos() {
    try {
      const response = await fetch('http://10.139.75.17:5251/api/Objeto/GetAllObjeto', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        setObjetos(json);
        console.log(objetos)
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    getObjetos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 10,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, [fade])
  );

  return (
    <Animated.View style={{ opacity: fade }}>
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
              <Objetos
                nome={item.objetoNome}
                cor={item.objetoCor}
                foto={item.objetoFoto}
                observacao={item.objetoObservacao}
                local={item.objetoLocalDesaparecimento}
                dtDesaparecimento={item.objetoDtDesaparecimento}
                dtEncontro={item.objetoDtEncontro}
                status={item.objetoStatus}
              />
            )}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            contentContainerStyle={{ height: (objetos.length * 575) / 2 }}
            horizontal={false}
            numColumns={2}
          />
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </View>
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
});
