import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import DetalheHomeopatia from './src/screen/EditarHomeopatiaScreen';
import CadastroHomeopatiaScreen from './src/screen/CadastroHomeopatiaScreen';
import CadastroReceitaScreen from './src/screen/CadastroReceitaScreen';
import EditarReceitaScreen from './src/screen/EditarReceitaScreen';
import CadastroPacienteScreen from './src/screen/CadastroPacienteScreen'
import EditarPacienteScreen from './src/screen/EditarPacienteScreen'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{title: 'Registro de Homeopatias'}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPacienteScreen} /> 
        <Stack.Screen name="EditarPaciente" component={EditarPacienteScreen} />
        <Stack.Screen name="DetalheHomeopatia" component={DetalheHomeopatia} />
        <Stack.Screen name="CadastroHomeopatia" component={CadastroHomeopatiaScreen} />
        <Stack.Screen name="EditarHomeopatia" component={DetalheHomeopatia} />
        <Stack.Screen name="CadastroReceita" component={CadastroReceitaScreen} />
        <Stack.Screen name="EditarReceita" component={EditarReceitaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;