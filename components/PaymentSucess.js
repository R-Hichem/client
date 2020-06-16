import React, {useState, useEffect} from 'react';
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

const PaymentSucess = ({navigation}) => {
  const [done, setDone] = useState(false);
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
          <ChargementScreen setDone={setDone} />
        )}
      </Body>
    </Container>
  );
};

export default PaymentSucess;

const ChargementScreen = ({setDone}) => {
  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 5000);
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
