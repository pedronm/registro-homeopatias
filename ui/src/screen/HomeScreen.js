import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import ListaReceitas from '../components/ListaReceitas'

const HomeScreen = () => {

    const [receitas, setReceitas] = useState([])

    useEffect(
        () => {
            setReceitas([
                {
                    id: 1,
                    paciente: 'Mauricio Lima',
                    homeopatias: [
                        {
                            descricao: 'Abacateiro',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '50'
                        },
                        {    
                            descricao: 'Abies nigra',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '12'
                        },
                        {
                            descricao: 'aceticum acidum',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '6'
                        }
                    ]
                }, 
                {
                    id: 2,
                    paciente: 'Marcia Costa',
                    homeopatias: [
                        {
                            descricao: 'Abacateiro',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '50'
                        },
                        {    
                            descricao: 'Abies nigra',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '12'
                        },
                        {
                            descricao: 'aceticum acidum',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '6'
                        }
                    ]
                }, 
                {
                    id: 3,
                    paciente: 'Jenifer Barbosa',
                    homeopatias: [
                        {
                            descricao: 'Abacateiro',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '50'
                        },
                        {    
                            descricao: 'Abies nigra',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '12'
                        },
                        {
                            descricao: 'aceticum acidum',
                            posologia: '2 gotas por dia',
                            dinamizacao: 'dm',
                            dinamo: '6'
                        }
                    ]
                }, 
            ])
        }, []
    )

    return (
        <View style={styles.container}>
            {
                receitas.length > 0
                ? <ListaReceitas  registros={receitas}   />
                : <Text>Sem Receitas!</Text>
            }
          <StatusBar style="auto" />
        </View>
      );    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default HomeScreen