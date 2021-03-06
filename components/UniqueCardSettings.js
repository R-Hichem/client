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
} from 'native-base';
import {Image, View, ActivityIndicator, Alert} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import {baseURL} from './baseURL';
import LinearGradient from 'react-native-linear-gradient';
import MyCardComponent from './MyCardComponent';
import MyCustomCardThatDoesNotFlip from './MyCustomCardThatDoesNotFlip';

axios.defaults.baseURL = baseURL;

const UniqueCardSettings = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const [singleCard, setSingleCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {card} = route.params;

  useEffect(() => {
    axios
      .get('/api/cards/' + card.id)
      .then(resposne => {
        console.log(resposne.data.card);
        setSingleCard(resposne.data.card);
        setLoading(false);
      })
      .catch(error => {
        console.log('singleCardError', error);
      });
  }, []);
  let imagedata;
  switch (card.type) {
    case 'visa':
      imagedata = require('./images/12356.jpg');
      break;
    case 'master-card':
      imagedata = require('./images/card-front.png');
      break;
    default:
      break;
  }
  if (deleteLoading) {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Container>
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
          name={
            card.type == 'visa'
              ? 'cc-visa'
              : card.type == 'master-card'
              ? 'cc-mastercard'
              : 'credit-card'
          }
          style={{margin: 10, color: 'white', fontSize: 20}}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
          }}>
          {card.type}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
            textAlign: 'right',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        />
      </LinearGradient>
      <Body>
        <ScrollView style={{padding: 10}}>
          {/* <CreditCard navigation={navigation} /> */}
          {/* <MyCardComponent
            name={card.name}
            number={card.card_number.match(/.{4}/g).join(' ')}
            expiry={card.exp}
            type={card.type}
          /> */}
          <MyCustomCardThatDoesNotFlip
            imageFront={imagedata}
            imageBack={imagedata}
            bar={true}
            number={card.card_number}
            name={card.name.toUpperCase()}
            expiry={card.exp}
            focused={'number'}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 50,
            }}>
            {loading ? (
              <Spinner />
            ) : (
              <Text style={{fontSize: 20}}>Solde {singleCard.sold} DZD</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Attention',
                'Etes vous sure de vouloir supprimer votre carte ?',
                [
                  {
                    text: 'Non',
                    style: 'cancel',
                  },
                  {
                    text: 'Oui',
                    onPress: () => {
                      setDeleteLoading(true);
                      axios
                        .post('/api/removeCard/' + card.id)
                        .then(resposne => {
                          console.log(resposne.data);
                          setDeleteLoading(false);
                          alert('card removed');
                          navigation.navigate('Home');
                        })
                        .catch(error => {
                          console.log(error);
                          setDeleteLoading(false);
                          alert("une erreur c'est produite");
                        });
                    },
                  },
                ],
                {cancelable: true},
              );
            }}>
            <MyButton text="Supprimer" iconName="credit-card" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SingleCardEdit', {
                card,
              })
            }>
            <MyButton text="Modifier les informations" iconName="credit-card" />
          </TouchableOpacity>
        </ScrollView>
      </Body>
    </Container>
  );
};

export default UniqueCardSettings;

const CreditCard = () => {
  return (
    <View>
      <Image
        source={require('./rsz_visa_1.png')}
        style={{height: 150, width: 250, marginVertical: 15}}
      />
    </View>
  );
};

const MyButton = ({text, iconName, iconFamily}) => {
  return (
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5DA271',
        padding: 10,
        borderRadius: 15,
        marginVertical: 8,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#F5F1ED',
          flexDirection: 'row',
          fontWeight: 'bold',
          justifyContent: 'center',
          flexGrow: 1,
          textAlign: 'center',
        }}>
        {text}
      </Text>
      {/* <Icon
          type={iconFamily ? iconFamily : 'FontAwesome'}
          name={iconName}
          style={{margin: 10, color: 'white', fontSize: 20}}
        /> */}
    </LinearGradient>
  );
};
