import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useContext, useEffect, useState } from 'react';

import Home from '../Pages/Home';
import AdicionarObjetos from '../Pages/AdicionarObjeto';
import Login from '../Pages/Login';
import Inserir from '../Pages/InserirUsuario';
import BuscaUsuario from '../Pages/BuscaUsuario';
import AuthScreen from '../Pages/AuthScreen';

import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function Rotas() {

  const { logado, cadastro } = useContext(AuthContext);
  const [usuarioSalvoNoAsync, setUsuarioSalvoNoAsync] = useState(false);

  useEffect(() => {
    const verificarUsuarioAsyncStorage = async () => {
      const userId = await AsyncStorage.getItem("userId")
      if ( userId !== null) {
        setUsuarioSalvoNoAsync(true);
      }
    };
    verificarUsuarioAsyncStorage();
  }, [])

  return (
    <NavigationContainer>
      {logado || usuarioSalvoNoAsync ? (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4BBEE7",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "black" },
        tabBarShowLabel: false
      }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="AdicionarObjetos"
          component={AdicionarObjetos}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="Inserir"
          component={Inserir}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="file-excel-box" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="BuscaUsuario"
          component={BuscaUsuario}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="play" color={color} size={35} />
            ),
          }}
        />
      </Tab.Navigator>
      ) : (
        <AuthScreen/>
      )}
    </NavigationContainer>
  );
}
