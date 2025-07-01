import React, {useState, useContext} from "react"
import {TextInput, View, Text, StyleSheet} from 'react-native'
import { Context as HomeopatiaContext} from '../context/PacienteContext'
import { HomeopatiaForm } from "../components/HomeopatiaForm"

const CadastroHomeopatia = ({route, navigation : {navigate}}) => {

    const idReceita = route.params
    const {adicionarHomeopatia} = useContext(HomeopatiaContext)

    return <HomeopatiaForm  
        isEditing={false}
        onSubmit={(descricao, posologia, dinamizacao, dinamo) =>    
            {
                const homeopatia = { descricao,posologia,dinamizacao,dinamo }
                adicionarHomeopatia(idReceita, homeopatia, () => navigate('EditarReceita', idReceita))
            }
        }
    />
}

const styles = StyleSheet.create({})

export default CadastroHomeopatia