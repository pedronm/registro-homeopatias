import {useState,} from 'react'
import {View, Text, TextInput, Button, StyleSheet } from 'react-native'

export const HomeopatiaForm = ({onSubmit, initialValues, isEditing}) => {

    const [descricao, setDescricao] = useState(initialValues.descricao)
    const [posologia, setPosologia] = useState(initialValues.posologia)
    const [dinamo, setDinamo] = useState(initialValues.dinamo)
    const [dinamizacao, setDinamizacao] = useState(initialValues.dinamizacao)
    
    return <View>
        
        <Text style={styles.titulo}>
            Descricao:
        </Text>
        <TextInput value={descricao} defaultValue={descricao} onChangeText={(txt) => setDescricao(txt)}  />
    
        <Text style={styles.titulo}>
            Posologia:
        </Text>
        <TextInput value={posologia} defaultValue={posologia} onChangeText={(txt) => setPosologia(txt) } />
            
        <Text style={styles.titulo}>
            Dinamizacao:
        </Text>
        <TextInput value={dinamizacao} defaultValue={dinamizacao} onChangeText={(txt) => setDinamizacao(txt) } />
        
        
        <Text style={styles.titulo}>
            Dinamo:
        </Text>
        <TextInput value={dinamo} defaultValue={dinamo} onChangeText={(txt) => setDinamo(txt) } />

        <Button title={'Incluir'} onPress={() => onSubmit(descricao, posologia, dinamizacao, dinamo)}></Button>
    </View>
}

HomeopatiaForm.defaultProps = {
    initialValues: {
        idHomeopatia: '',
        descricao: '',
        posologia: '',
        dinamizacao: '',
        dinamo: ''
    }
}

const styles = StyleSheet.create({})

