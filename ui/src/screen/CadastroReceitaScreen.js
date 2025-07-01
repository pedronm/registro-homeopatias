
import {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Context as ReceitaContext, Provider as ReceitaProvider } from '../context/ReceitaContext'
import ReceitaForm from '../components/ReceitaForm'

const CadastroReceitaScreen = ({route, navigation: { navigate }}) => {
    const id = route.params

    const { addReceita } = useContext(ReceitaContext);
    
    return <View>
        <ReceitaForm onSubmit={ (dataSelecionada) => {
          addReceita(id, dataSelecionada, () => navigate('Home') )
        }}/>
      </View>
}

const styles = StyleSheet.create({});

export default (data) => <ReceitaProvider> <CadastroReceitaScreen route={data.route} navigation={data.navigation}></CadastroReceitaScreen> </ReceitaProvider>
