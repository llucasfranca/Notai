import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Home from './src/screens/Home'
import AddNota from './src/screens/AddNota'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Notas" component={Home} />
                    <Stack.Screen name="Nova Nota" component={AddNota} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}
