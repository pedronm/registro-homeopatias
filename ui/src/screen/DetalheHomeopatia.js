import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

const DetalheHomeopatia = ({ homeopatia }) => {
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
        marginLeft: 20,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    bloco:{
        flex:1,
        flexDirection:'row'
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