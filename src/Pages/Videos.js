import { View, Text, TouchableOpacity, Share, Alert, StyleSheet } from 'react-native'
import React from 'react'

export default function Videos() {

    async function onShare()
    {
        try{
            const result = await Share.share({
                message:
                "React Native | A framework for building native apps using React"
            });
            console.log(result);
        } catch(error)
        {
            Alert(error.message);
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.textVideo}>Compartilhando Videos</Text>
      <TouchableOpacity onPress={onShare} style={styles.btn}>
        <Text style={styles.textBtn}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161616",
        flex: 1,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    textVideo: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        justifyContent: "center"
    },
    btn: {
        backgroundColor: "#4BBEE7",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        height: 60,
        display: "flex",
        margin: 'auto',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        // elevation: 3,
    },  
})