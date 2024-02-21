import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'

const ItemReceita = ({receita, onTap}) => {
    return <View style={styles.container}>
        <Text style={styles.nomePaciente}>{receita.paciente}</Text>
        <Button title='Cadastrar nova Homeopatia' />
        <FlatList            
            horizontal
            showsHorizontalScrollIndicator={false}
            data={receita.homeopatias}
            keyExtractor= {(homeopatia) => homeopatia.id}
            renderItem= { ({item}) => {
                return <TouchableOpacity style={styles.containerItemLista} onPress={onTap}>
                    <Text style={styles.nomeHomeopatia}>
                        {item.descricao}
                    </Text>
                    <Text style={styles.posologia}>{item.posologia}</Text>
                </TouchableOpacity> 
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 18,
        marginHorizontal: 14,
        padding: 20,
        borderColor: 'black',
        borderRadius: 3,
        borderLeftWidth: 2
    },
    nomePaciente:{
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 5,
        marginVertical: 10
    },
    containerItemLista:{
        backgroundColor: 'rgba(255, 150, 105, .3)',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        height: 70,
        flexDirection: 'column'
    },
    nomeHomeopatia:{
        fontSize: 16,
        flex:1
    },
    posologia:{
        fontSize:8,
        flex:1

    }
})

export default ItemReceita