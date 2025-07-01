import React, { useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as PacienteContext, Provider as PacienteProvider } from '../context/PacienteContext'
import PacienteForm from '../components/PacienteForm'

const CadastroPacienteScreen = ( { route, navigation: { navigate } } ) => {

    const { addPaciente } = useContext(PacienteContext)

    return <View>
        <PacienteForm 
            isEditing={false}
            initialValues={ { } }
            onSubmit={ (nome) => {
                console.log('antes de ser enviado ao context',nome)
                addPaciente(nome, () => navigate('Home') )
        }}/>
    </View>
}

const styles = StyleSheet.create({})

export default (data) => <PacienteProvider><CadastroPacienteScreen route={data.route} navigation={data.navigation}></CadastroPacienteScreen></PacienteProvider> 