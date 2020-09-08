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
  Form,
  Item,
  Input,
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
import MyButton from './MyButton';

axios.defaults.baseURL = baseURL;

const AddCard = ({navigation}) => {
  const [newCardObject, setNewCardObject] = useState(null);
  const [cardHolderName, setCardHolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const {addCard, user} = useContext(AuthContext);
  const __onChange = form => {
    console.log(form.status);
    setNewCardObject(form);
  };
  const cardInfo = {
    type: 'visa',
  };
  const addCardInfo = (cardName, cardDetails, user, setLoading) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axios
      .post('/api/addCard', {
        name: cardName,
        card_number: cardDetails.number,
        type: cardDetails.type ? cardDetails.type : 'other',
        ccv: cardDetails.cvc,
        exp: cardDetails.expiry,
      })
      .then(response => {
        setLoading(false);
        alert('carte ajouté');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error.response);
        setLoading(false);
        alert("une erreur c'est produite !");
      });
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Text style={{fontSize: 20}}>Mise à jour des informations ...</Text>
        <Spinner color="blue" size={100} />
      </View>
    );
  }
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
          name="plus"
          style={{margin: 10, color: 'white', fontSize: 20}}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
          }}>
          Ajouter une carte
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
      <ScrollView
        style={{
          padding: 10,
        }}>
        <Form style={{paddingHorizontal: 25}}>
          <Item
            style={{
              borderBottomWidth: 2,
              borderBottomColor: 'gray',
              marginBottom: 30,
            }}>
            <Input
              placeholder="Nom sur la carte"
              onChangeText={text => {
                setCardHolderName(text);
              }}
              value={cardHolderName}
            />
          </Item>
        </Form>
        <CreditCardInput
          allowScroll
          cardFontFamily="kredit.regular"
          cardScale={0.9}
          onChange={__onChange}
          labels={{
            number: 'Numero de la carte',
            expiry: "Date d'expiration",
          }}
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
          newCardObject.status.number !== 'incomplete' &&
          newCardObject.status.expiry === 'valid' &&
          newCardObject.status.cvc === 'valid' ? (
            cardHolderName ? (
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  addCardInfo(
                    cardHolderName,
                    newCardObject.values,
                    user,
                    setLoading,
                  );
                }}
                style={{
                  marginTop: 30,
                }}>
                <MyButton text="Confirmer" />
              </TouchableOpacity>
            ) : null
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                padding: 15,
                color: 'red',
              }}>
              incomplet
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
      </ScrollView>
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
