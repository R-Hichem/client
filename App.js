import React from 'react';
import Routes from './Routes';
import {AuthProvider} from './components/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

//AsyncStorage.removeItem('user');
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
