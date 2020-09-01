import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import SingleCard from './components/SingleCard';
import CameraModule from './components/CameraModule';
import PaymentSucess from './components/PaymentSucess';
import ScanScreen from './components/ScanScreen';
import {AuthContext} from './components/AuthProvider';
import {View, Spinner} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './components/LoginScreen';
import AddCard from './components/AddCard';

const Stack = createStackNavigator();
const Routes = () => {
  const {user, setUser, login, logout, loading, setLoading} = useContext(
    AuthContext,
  );
  useEffect(() => {
    // check if the user is logged in or not
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString);
          setUser(userObject);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainApp /> : <LoginScreen />}
    </NavigationContainer>
  );
};
export default Routes;

const MainApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          header: () => null,
        }}
      />
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
        component={ScanScreen}
        options={{
          header: () => null,
        }}
      />
      {/* <Stack.Screen
          name="CameraModule"
          component={CameraModule}
          options={{
            header: () => null,
          }}
        /> */}

      <Stack.Screen
        name="PaymentSucess"
        component={PaymentSucess}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
