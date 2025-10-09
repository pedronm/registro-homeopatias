import {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Context as PacienteContext} from '../context/PacienteContext'
import { PacienteForm } from '../components/PacienteForm'

// TODO: Concluir processo de adicionar as homeopatias daqui
const EditarReceitaScreen = ({route, navigation}) => {
    const id = route.params
    const {state} = useContext(PacienteContext)
    const receita = state.find( (receita) => receita.id === id)
    const { editarListaHomeopatia } = useContext(PacienteContext)

    console.log('receita que está na tela, e que veio carregada', receita)
    
    return <View>
        {/* <Text>{'Id em edição ' + id}</Text>
        <PacienteForm
            isEditing={true}
            initialValues={{id: id, nome: receita.nome, homeopatias: receita.homeopatias}}
            onSubmit={ (nome) => 
                editarListaHomeopatia(id, nome, () => {navigation.pop()})
            }
        /> */}
    </View>
}

const styles = StyleSheet.create({})

export default EditarReceitaScreen