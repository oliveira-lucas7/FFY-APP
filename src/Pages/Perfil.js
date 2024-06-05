import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Perfil() {

    const fade = useRef( new Animated.Value(0)).current;

    useEffect( () => {
        console.log("Carregou o perfil")
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start();
        }, [])
    )

  return (
    <View style={styles.container}>
        <Animated.View style={{opacity: fade}}>
            <Text style={styles.textPerfil}>Perfil</Text>
        </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161616",
        flex: 1,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center"
    },
    textPerfil: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        justifyContent: "center"
    }
})