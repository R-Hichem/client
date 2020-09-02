import React, {useState, useEffect, useContext} from 'react';
import {
  Container,
  Header,
  Text,
  Icon,
  Body,
  Card,
  CardItem,
  Spinner,
  View,
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {AuthContext} from './AuthProvider';
import {baseURL} from './baseURL';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import MyCardComponent from './MyCardComponent';
import LinearGradient from 'react-native-linear-gradient';

axios.defaults.baseURL = baseURL;

const AddCard = ({navigation}) => {
  const [newCardObject, setNewCardObject] = useState(null);
  const __onChange = form => {
    console.log(form.status);
    setNewCardObject(form);
  };
  const cardInfo = {
    type: 'visa',
  };

  return (
    <Container style={{backgroundColor: '#E6E6E6'}}>
      <LinearGradient
        useAngle={true}
        angle={180}
        angleCenter={{x: 0.5, y: 0}}
        colors={['#1399cd', '#0f509e']}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#5DA271',
          padding: 10,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}>
        <Icon
          type="FontAwesome"
          name="user"
          style={{margin: 10, color: 'white', fontSize: 20}}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
          }}>
          Mes cartes
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
            textAlign: 'right',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}>
          <Icon
            type="FontAwesome"
            name="bell"
            style={{margin: 10, color: 'white', fontSize: 20}}
          />
        </Text>
      </LinearGradient>
      <CreditCardInput
        onChange={__onChange}
        addtionalInputsProps={{
          name: {
            defaultValue: 'my name',
            maxLength: 40,
          },
          postalCode: {
            returnKeyType: 'go',
          },
        }}
      />
      {newCardObject ? (
        newCardObject.status.number === 'valid' &&
        newCardObject.status.expiry === 'valid' &&
        newCardObject.status.cvc === 'valid' ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              padding: 15,
              color: 'green',
            }}>
            valid
          </Text>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              padding: 15,
              color: 'red',
            }}>
            not valid yet
          </Text>
        )
      ) : (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            padding: 15,
          }}>
          hello not def ?
        </Text>
      )}
    </Container>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  addCard: {
    height: 200,
    width: 300,
    marginVertical: 15,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 15,
    borderStyle: 'dashed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
