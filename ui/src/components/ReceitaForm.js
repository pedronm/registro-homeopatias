
import React, {useContext, useEffect, useState, } from 'react'
import {useNavigation } from '@react-navigation/native'
import {View, Text, TextInput, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native'
import SelecionaData from './SelecionaData';
import {Context as HomeopatiaContext, Provider as HomeopatiaProvider } from '../context/HomeopatiaContext'

const ReceitaForm = ({onSubmit, initialValues, isEditing, navigation}) => {
    
    const [id, setId] = useState(initialValues.id)
    const [dtCriacao, setDtCriacao] = useState(initialValues.dtCriacao)
    const [homeopatias, setHomeopatias] = useState(initialValues.homeopatias)
    const nav = useNavigation()

    const {state, addHomeopatia, excluirHomeopatia} = useContext(HomeopatiaContext)

    console.log(' Valores inciais do Formulario de Receita '  + JSON.stringify(initialValues))

    return <View>
        <Text>Data de registro da receita: </Text>
        <View>
            <View>
                <Text style={styles.campoData}>
                    Data selecionada: {dtCriacao ? dtCriacao.format('DD/MM/YYYY') : 'sem data'}</Text>
            </View>
            <SelecionaData onDataSelecionada={ (dataSelecionada) => setDtCriacao(dataSelecionada)}></SelecionaData>
        </View>
        { isEditing ?    <>
            <HomeopatiaProvider>

                <Button title={'Edita Receita'} onPress={() => {
                        console.log('Antes de enviar pro formulario de homeopatia' + initialValues.id)
                        nav.navigate('EditarListaHomeopatia', initialValues.id)
                    } }></Button>
                
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={initialValues.homeopatias}
                    keyExtractor={(homeopatia) => homeopatia.id}
                    renderItem={({ item }) => {
                        return <TouchableOpacity style={styles.containerItemLista}
                            onPress={
                                () => {
                                    navigate('DetalheHomeopatia', item)
                                }
                            }>
                            <View >
                                <Text style={styles.tituloHomeopatia}>
                                    {item.descricao + ' ' + item.dinamizacao + item.dinamo  }
                                </Text>
                                <Text style={styles.subtituloHomeopatia}>{item.posologia}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                    /> 
            </HomeopatiaProvider>
        </>
        : null}
        <Button title={isEditing ? 'Salvar' : 'Incluir'} onPress={() => onSubmit(dtCriacao)}/>
    </View>
}

ReceitaForm.defaultProps = {
    initialValues: {
        id: '',
        nome : '',
        homeopatias: []
    }
}

const styles = StyleSheet.create({
    containerItemLista: {
        width:400,
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 15,
        backgroundColor: 'rgb(255,255,250)',
        borderRadius: 7,
        flexDirection: 'row'
    },
    tituloHomeopatia:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtituloHomeopatia:{
        fontSize: 10,
        fontWeight:'100'
    },
    campoData:{
        fontSize: 12,
        color: 'green',
        marginVertical: 15,
        marginHorizontal: 15
    }
})

export default (data) => <HomeopatiaProvider><ReceitaForm onSubmit={data.onSubmit} initialValues={data.initialValues} isEditing={data.isEditing} navigation={data.navigation}> 
    </ReceitaForm></HomeopatiaProvider>