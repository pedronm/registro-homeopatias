import React, { useContext } from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { HomeopatiaForm } from '../components/HomeopatiaForm'
import { Context as PacienteContext } from '../context/PacienteContext'

const EditarHomeopatiaScreen = ({ route, navigation:{navigate} }) => {   

    const idReceita = route.params.idReceita,
          idHomeopatia = route.params?.idHomeopatia

    const {state} = useContext(PacienteContext)
    // const receita = state.filter( paciente => paciente.id === id )
    // const {editarHomeopatia} = useContext(PacienteContext)

    // return <HomeopatiaForm 
    //             initialValues={{}}
    //             isEditing={true}
    //             onSubmit={(descricao, posologia, dinamizacao, dinamo)=>{
    //                 editarHomeopatia(idHomeopatia, idReceita, descricao, posologia, dinamizacao, dinamo)
    //             }}
    //     />
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
        fontSize: 20
    }
})

export default (data) => <PacienteContext><EditarHomeopatiaScreen route={data.route} naviagation={data.navigation}></EditarHomeopatiaScreen></PacienteContext>