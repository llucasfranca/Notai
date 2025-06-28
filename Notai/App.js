import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NovaPasta from './src/screens/NovaPasta';
import PastaDetalhe from './src/screens/PastaDetalhe';
import EditNota from './src/screens/EditarNota';
import Home from './src/screens/Home';
import AddNota from './src/screens/AddNota';
import SplashScreen from './src/components/EfCrescimento'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // igual à duração da animação

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Notas" component={Home} />
            <Stack.Screen name="Nova Nota" component={AddNota} />
            <Stack.Screen name="NovaPasta" component={NovaPasta} />
            <Stack.Screen name="PastaDetalhe" component={PastaDetalhe} />
            <Stack.Screen name="EditNota" component={EditNota} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
}
