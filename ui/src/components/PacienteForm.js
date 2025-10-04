import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Context as PacienteContext } from '../context/PacienteContext';
import { Context as ReceitaContext, Provider as ReceitaProvider } from '../context/ReceitaContext';
import { Feather } from '@expo/vector-icons';

const PacienteForm = ({ onSubmit, initialValues, isEditing, navigation }) => {
    const { receitaState, removerReceita } = useContext(ReceitaContext);
    const { editarPaciente } = useContext(PacienteContext);
    const [id, setId] = useState(initialValues.id);
    const [nome, setNome] = useState(initialValues.nome);
    const nav = useNavigation();

    console.log('Valores iniciais do Formulario de Paciente ' + JSON.stringify(initialValues));

    return (
            <View>
                <Text>Nome: </Text>
                <TextInput
                    value={nome}
                    onChangeText={nome => setNome(nome)}
                />
                {isEditing ? (
                    <>
                        <ReceitaProvider>
                            <Button title={'Adicionar Receita'} onPress={() => {
                                console.log('Antes de enviar pro formulario da Receita' + initialValues.id);
                                nav.navigate('CadastroReceita', initialValues.id);
                            }}></Button>

                            <FlatList
                                data={receitaState}
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            nav.navigate('EditarPaciente', item.id);
                                        }}>
                                            <View style={styles.containerReceita}>
                                                <Text style={styles.labelDataReceita}>{item.dataCriacao}</Text>
                                                <View>
                                                    <Text style={styles.smLabelCard}> Receitas: </Text>
                                                    <FlatList
                                                        data={item.receitas}
                                                        keyExtractor={(item) => item.id}
                                                        showsVerticalScrollIndicator={true}
                                                        renderItem={({ item }) => {
                                                            return (
                                                                <View>
                                                                    <Text style={styles.label}>{item.nome}</Text>
                                                                    <Text style={styles.descricao}>{item.descricao}</Text>
                                                                </View>
                                                            );
                                                        }}
                                                    />
                                                </View>
                                                <Pressable onPress={() => {
                                                    removerReceita(item.id);
                                                }}>
                                                    <Feather styles={styles.icon} name="trash" size={24} color="black" />
                                                </Pressable>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </ReceitaProvider>
                    </>
                ) : null}
                <Button title={isEditing ? 'Salvar Paciente' : 'Incluir Paciente'} onPress={() => {
                    console.log("nome antes de enviar o form", nome);
                    onSubmit(nome, id, onSubmit, isEditing, navigation);
                }} />
            </View>
    );
};

PacienteForm.defaultProps = {
    initialValues: {
        id: '',
        nome: '',
        receitas: []
    }
};

const styles = StyleSheet.create({
    containerItemLista: {
        width: 400,
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 15,
        backgroundColor: 'rgb(255,255,250)',
        borderRadius: 7,
        flexDirection: 'row'
    },
    tituloHomeopatia: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtituloHomeopatia: {
        fontSize: 10,
        fontWeight: '100'
    },
    campoData: {
        fontSize: 12,
        color: 'green',
        marginVertical: 15,
        marginHorizontal: 15
    }
});

export default 

(data) => {
    return <ReceitaProvider><PacienteForm onSubmit={data.onSubmit} initialValues={data.initialValues} isEditing={data.isEditing}  navigation={data.navigation}  >
         </PacienteForm>
        </ReceitaProvider>
}