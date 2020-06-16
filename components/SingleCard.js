import React from 'react';
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
} from 'native-base';
import {Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const SingleCard = ({navigation}) => {
  return (
    <Container>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
          }}>
          Carte Visa
        </Text>
        <Icon
          type="Feather"
          name="credit-card"
          style={{marginLeft: 10, color: 'white', fontSize: 28}}
        />
      </Header>
      <Body>
        <CreditCard navigation={navigation} />
        <List>
          <ListItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>VISA Card</Text>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>**** **** **** 4423</Text>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>Jonah Hawes</Text>
          </ListItem>
          <ListItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>date d'xpiration 17/11</Text>
          </ListItem>
        </List>

        <Button
          block
          style={{marginBottom: 15}}
          onPress={() => navigation.navigate('CameraModule')}>
          <Text>Payer</Text>
        </Button>
        <Button block>
          <Text>Modifier</Text>
        </Button>
      </Body>
    </Container>
  );
};

export default SingleCard;

const CreditCard = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleCard')}>
      <Image
        source={require('./rsz_visa_1.png')}
        style={{height: 200, width: 300, marginVertical: 15}}
      />
    </TouchableOpacity>
  );
};
