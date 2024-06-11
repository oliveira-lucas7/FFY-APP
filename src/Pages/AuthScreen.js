import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Login from './Login'
import InserirUsuario from './InserirUsuario'
import { AuthContext } from '../Context/AuthContext'

export default function AuthScreen() {

    const { showCadastro, toggleScreen } = useContext(AuthContext)

  return (
    <>
        {showCadastro ? <InserirUsuario/> : <Login/>}
        <Button
            title={
                showCadastro 
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Cadastre-se"
            }
            onPress={toggleScreen}
        />
    </>
  );
}

const styles = StyleSheet.create({})