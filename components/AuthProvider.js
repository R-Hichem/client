import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {baseURL} from './baseURL';

axios.defaults.baseURL = baseURL;

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login: (email, password) => {
          setLoading(true);
          console.log('preLogin');
          axios
            .post('/api/token', {
              email,
              password,
              device_name: 'mobile',
            })
            .then(response => {
              setLoading(false);
              const userResponse = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                token: response.data.token,
              };
              setUser(userResponse);
              setError(null);
              AsyncStorage.setItem('user', JSON.stringify(userResponse));
              console.log(JSON.stringify(userResponse));
            })
            .catch(error => {
              console.log(error);
              setLoading(false);

              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
              console.log('error');
            });
        },
        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${
            user.token
          }`;

          axios
            .post('/api/logout')
            .then(response => {
              setUser(null);
              AsyncStorage.removeItem('user');
              setLoading(false);
            })
            .catch(error => {
              console.log(error.response);
              setLoading(false);
            });
        },
        // addCard: (cardName, cardDetails) => {
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${
        //     user.token
        //   }`;
        //   axios
        //     .post('/api/addCard', {
        //       name: cardName,
        //       card_number: cardDetails.number,
        //       type: cardDetails.type,
        //       ccv: cardDetails.cvc,
        //       exp: cardDetails.expiry,
        //     })
        //     .then(response => {
        //       setUser(null);
        //       setLoading(false);
        //     })
        //     .catch(error => {
        //       console.log(error.response);
        //       setLoading(false);
        //     });
        // },
        loading,
        setLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
