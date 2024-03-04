import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from './src/context/ReceitasContext'
import HomeScreen from './src/screen/HomeScreen';
import DetalheHomeopatia from './src/screen/DetalheHomeopatia';
import CadastroHomeopatia from './src/screen/CadastroHomeopatia';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{title: 'Registro de Homeopatias'}}>
          <Stack.Screen name="Home" >
            {(props) => {
              const someData = {'test':"testing :)"}
              return <HomeScreen {...props} extraData={someData} />
            }}
          </Stack.Screen>
          <Stack.Screen name="DetalheHomeopatia" component={DetalheHomeopatia} />
          <Stack.Screen name="CadastroHomeopatia" component={CadastroHomeopatia} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;