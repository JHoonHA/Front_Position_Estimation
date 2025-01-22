import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PEPresenter from './src/Pages/PE/PEPresenter';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PE">
                <Stack.Screen name="PE" component={PEPresenter} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
