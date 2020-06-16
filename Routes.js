import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import SingleCard from './components/SingleCard';
import CameraModule from './components/CameraModule';
import PaymentSucess from './components/PaymentSucess';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="SingleCard"
          component={SingleCard}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CameraModule"
          component={CameraModule}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="PaymentSucess"
          component={PaymentSucess}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
