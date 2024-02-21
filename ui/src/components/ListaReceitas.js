import React from 'react'
import {FlatList, StyleSheet, View, Text, Button} from 'react-native'
import ItemReceita from './ItemReceita'

const ListaReceitas = ({navigation, registros}) => {
    return <>
        <Button title='Cadastrar Paciente' />
        <Text>
            {'A quantidade de receitas é de ' + registros.length}
        </Text>
        <Text>
            {'O primeiro paciente é ' + registros[0].paciente}
        </Text>
        <FlatList
            style={styles.lista}
            vertical            
            showsVerticalScrollIndicator={false}
            data={registros}
            keyExtractor={(item) => item.id}
            renderItem= {({item}) => {
               return <ItemReceita onTap={ () => {
                navigation.navigate('DetalheHomeopatia')
               }} receita={item} />
            }}
        />
    </>    
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
        marginHorizontal: 25
    },
})

export default ListaReceitas