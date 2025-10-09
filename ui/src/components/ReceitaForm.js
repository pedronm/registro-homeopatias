
import React, {useContext, useEffect, useState, } from 'react'
import {useNavigation } from '@react-navigation/native'
import {View, Text, TextInput, StyleSheet, Button, FlatList, TouchableOpacity, Alert, BackHandler} from 'react-native'
import SelecionaData from './SelecionaData';
import {Context as HomeopatiaContext, Provider as HomeopatiaProvider } from '../context/HomeopatiaContext'
import {formatDate} from './../utils/dateUtil';
import { useBackHandlerWithAlert } from '../hooks/navigatingHelper';

const ReceitaForm = ({onSubmit, initialValues, isEditing, navigation}) => {
    
    const [id, setId] = useState(initialValues.id)
    const [dtCriacao, setDtCriacao] = useState(initialValues.dtCriacao)
    const [homeopatias, setHomeopatias] = useState(initialValues.homeopatias)
    const {state, addHomeopatia, excluirHomeopatia} = useContext(HomeopatiaContext)
    const nav = useNavigation()

    useBackHandlerWithAlert(navigation)

    return <View>
        <Text>Data de registro da receita: </Text>
        <View>                        
            <View>
                <Text style={styles.campoData}>
                    Alterar Data: { dtCriacao ? formatDate(dtCriacao) : 'Não informada' }
                </Text>
            </View>
                <SelecionaData onDataSelecionada={ (dataSelecionada) => {
                        setDtCriacao(dataSelecionada)
                    }
                }></SelecionaData>

        </View>
        { isEditing ? ( 
            <>
                    <Button title='Adicionar Homeopatia' onPress={ () => {
                        console.log('Navegando para tela de cadastro de homeopatia, passando id da receita: ' + id)
                        navigation.navigate('CadastroHomeopatia', {idReceita: id})
                    }}></Button>
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
            </>) : null }
    </View>
}

ReceitaForm.defaultProps = {
    initialValues: {
        id: '',
        nome : '',
        homeopatias: [],
        dtCriacao: null
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