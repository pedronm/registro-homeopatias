import React from 'react'
import {FlatList, StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native'

const ListaReceitas = ({registros, nav}) => {
    return <>
        <Button title='Cadastrar Paciente' />
        <Text>
            {registros.length}
        </Text> 
        <FlatList
            style={styles.lista}
            vertical            
            showsVerticalScrollIndicator={false}
            data={registros}
            keyExtractor={(item) => item.id}
            renderItem= {({item}) => {  
               return <View style={styles.containerReceita}>
                <Text style={styles.nomePaciente}>{item.paciente}</Text>
                <Button title='Cadastrar nova Homeopatia' onPress={() => nav.navigate('CadastroHomeopatia')}/>
                <FlatList            
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={item.homeopatias}
                    keyExtractor= {(homeopatia) => homeopatia.id}
                    renderItem= { ({item}) => {
                        return <TouchableOpacity style={styles.containerItemLista} 
                            onPress={
                                () => {
                                    nav.navigate('DetalheHomeopatia', item)
                                }
                            }>
                            <Text style={styles.nomeHomeopatia}>
                                {item.descricao}
                            </Text>
                            <Text style={styles.posologia}>{item.posologia}</Text>
                        </TouchableOpacity> 
                    }}
                />
            </View>
            }}
        />
    </>    
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
        marginHorizontal: 25
    },
    containerReceita:{
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

export default ListaReceitas