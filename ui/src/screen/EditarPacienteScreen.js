import {useContext, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Provider as PacienteProvider} from '../context/PacienteContext'
import PacienteForm from '../components/PacienteForm'

const EditarPacienteScreen = ({route, navigation}) => {
    const paciente = route.params
    
    return <View>
        <Text>{'Id em edição ' + paciente.id}</Text>
        <PacienteProvider>
            <PacienteForm
                isEditing={true}
                initialValues={{id: paciente.id, nome: paciente.nome, homeopatias: paciente?.homeopatias}}
            />
        </PacienteProvider>
    </View>
    
}

const styles = StyleSheet.create({})

export default EditarPacienteScreen