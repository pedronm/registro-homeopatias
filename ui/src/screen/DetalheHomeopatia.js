import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

const DetalheHomeopatia = ({ route, navigation }) => {   
    const homeopatia = route.params
    return <View style={styles.container}>        
        <Text style={styles.bloco} >
            <Text style={styles.titulo}>
                Descricao:
            </Text>
            <Text style={styles.texto}>
                {homeopatia.descricao}
            </Text>
        </Text>
        <Text style={styles.bloco} >
            <Text style={styles.titulo}>
                Posologia:
            </Text>
            <Text style={styles.texto}>
                {homeopatia.posologia}
            </Text>
        </Text>
        <Text style={styles.bloco} >
            <Text style={styles.titulo}>
                Dinamizacao:
            </Text>
            <Text style={styles.texto}>
                {homeopatia.tipoDinamo}
            </Text>
        </Text>
        <Text style={styles.bloco} >
            <Text style={styles.titulo}>
                Dinamo:
            </Text>
            <Text style={styles.texto}>
                {homeopatia.dinamo}
            </Text>
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        alignContent: 'space-around',
        flexDirection: 'column',
        flex: 1
    },
    bloco:{
        flex:1,
        flexDirection:'row',
        height:200,
        width: 200
    },
    titulo:{
        flex:2,
        fontWeight: 'bold',
        fontSize: 20
    },
    texto:{
        flex:1,
        fontSize: 16
    }
})

export default DetalheHomeopatia