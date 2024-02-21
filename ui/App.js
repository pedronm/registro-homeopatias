import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import DetalheHomeopatia from './src/screen/DetalheHomeopatia';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{title: 'Registro de Homeopatias'}}>
        <Stack.Screen name="Home" >
          {(pros) => <HomeScreen {...props} extraData={someData} />}
        </Stack.Screen>
        <Stack.Screen name="DetalheHomeopatia" component={DetalheHomeopatia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;