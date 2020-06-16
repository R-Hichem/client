import React, {useState, useEffect, useContext} from 'react';
import {
  Container,
  Header,
  Text,
  Icon,
  Body,
  Card,
  CardItem,
  List,
  ListItem,
  Button,
  Spinner,
  View,
} from 'native-base';
import {Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import {baseURL} from './baseURL';

axios.defaults.baseURL = baseURL;

const PaymentSucess = ({route, navigation}) => {
  const [done, setDone] = useState(false);
  const {data, card} = route.params;
  return (
    <Container>
      <Body>
        {done ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text>Transaction Réussie</Text>
            <Button
              block
              success
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                marginTop: 30,
              }}>
              <Text>OK</Text>
            </Button>
            <Button
              block
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                marginTop: 30,
              }}>
              <Text>Faire un autre payement</Text>
            </Button>
          </View>
        ) : (
          <ChargementScreen setDone={setDone} data={data} card={card} />
        )}
      </Body>
    </Container>
  );
};

export default PaymentSucess;

const ChargementScreen = ({setDone, data, card}) => {
  const {user} = useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  const dataObject = JSON.parse(data);
  useEffect(() => {
    console.log(typeof dataObject);
    console.log(dataObject.to);
    axios
      .post('/api/transaction', {
        to: dataObject.to,
        account_code: dataObject.account_code,
        ammount: dataObject.ammount,
        card_id: card.id,
      })
      .then(response => {
        console.log('response', response.data);
        setDone(true);
      })
      .catch(error => {
        console.log('error', error.message);
        setDone(true);
      });
  }, []);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 0.75,
      }}>
      <Text>Traitement en cours ...</Text>
      <Spinner size={200} />
    </View>
  );
};
