import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import DeviceInfoScreen from './src/components/DeviceInfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="DeviceInfo" component={DeviceInfoScreen} options={{ title: 'Información del Dispositivo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;