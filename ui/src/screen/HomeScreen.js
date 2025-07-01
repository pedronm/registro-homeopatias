import React, { use, useContext, useEffect, useState } from 'react'
import { Context as PacienteContext, Provider as PacienteProvider} from '../context/PacienteContext'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'

const HomeScreen = ({ route, navigation: { navigate } }) => {
    const { state, getPorPagina, removerPaciente } = useContext(PacienteContext)
    // Way more efficient, cause it can update as the screen progress
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log('tela foi recarregada?', route)
        if(route.params?.isRefreshing){
            console.log('Tela Home foi atualizada', state)
            loadPacientes()
        }
    }, [])

    useEffect(() => {
        loadPacientes()
    },  page)

    const loadPacientes = async () => {
        setIsLoading(true)
        console.log(page)
        getPorPagina(page)
        console.log('Pacientes inseridos no state manage', state)
        setIsLoading(false)
    }

    const loadMorePacientes = () => {
        // helps to avoid calls while screen is freezed or loading heavly in bad connections situations
        if (!isLoading && state.length > pageSize) {
            setPage(page + 1)
        }
    }

    return (
        <View style={{flex: 1}}>
            <Button title={'Registra novo Paciente'} 
                onPress={  () => navigate('CadastroPaciente') }></Button>
            <FlatList
                data={state}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => {
                            console.log('Dados no state ', state)
                            navigate('EditarPaciente', item)
                        }}>
                        <View style={styles.containerNomePaciente}>
                            <Text style={styles.nomePaciente}>{item.nome}</Text> 
                            <Pressable onPress={() => {
                                  console.log(item.id)
                                  removerPaciente(item.id)
                                }}>
                                <Feather styles={styles.icon} name="trash" size={24} color="black" />
                            </Pressable>
                        </View>
                    </TouchableOpacity>
                }}
                onEndReached={loadMorePacientes}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{
                    flexGrow: 1,
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerNomePaciente: {
        marginVertical: 18,
        marginHorizontal: 14,
        padding: 20,
        backgroundColor: "rgb(255,255,250)",
        borderColor: 'white',
        borderRadius: 3,
        borderWidth: 5
    },
    nomePaciente: {
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft: 5,
        marginVertical: 10
    },
    listaNumeroPagina: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: 'rgb(230,220,250)',
        borderColor: 'gray',
        borderRadius: 2,
        borderWidth: 1
    }
    
});

export default (data) => <PacienteProvider><HomeScreen context={data.context} route={data.route} navigation={data.navigation}></HomeScreen></PacienteProvider>