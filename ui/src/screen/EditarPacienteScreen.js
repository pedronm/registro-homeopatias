import {useContext, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Provider as PacienteProvider, Context as PacienteContext} from '../context/PacienteContext'
import PacienteForm from '../components/PacienteForm'

const EditarPacienteScreen = ({route, navigation}) => {
    const paciente = route.params
    const {editarPaciente} = useContext(PacienteContext)
    
    return <View>
        <Text>{'Id em edição ' + paciente.id}</Text>
        <PacienteProvider>
            <PacienteForm
                isEditing={true}
                initialValues={{id: paciente.id, nome: paciente.nome, homeopatias: paciente?.homeopatias}}
                onSubmit={ (nome) => {
                    console.log('antes de ser enviado ao context', nome)
                    editarPaciente( paciente.id, nome, () => { navigation.pop() } )
                }}
            />
        </PacienteProvider>
    </View>
    
}

const styles = StyleSheet.create({})

export default (data) => <PacienteProvider> <EditarPacienteScreen route={data.route} navigation={data.navigation}></EditarPacienteScreen> </PacienteProvider>