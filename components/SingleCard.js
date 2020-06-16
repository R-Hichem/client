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
import {Image, View} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import {baseURL} from './baseURL';

axios.defaults.baseURL = baseURL;

const SingleCard = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const [singleCard, setSingleCard] = useState(null);
  const [loading, setLoading] = useState(true);
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
          {card.type}
        </Text>
        <Icon
          type="Feather"
          name="credit-card"
          style={{marginLeft: 10, color: 'white', fontSize: 28}}
        />
      </Header>
      <Body>
        <ScrollView style={{padding: 10}}>
          <CreditCard navigation={navigation} />
          <List>
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>{card.type}</Text>
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>**** **** **** {card.card_number.slice(-4)} </Text>
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>{card.name}</Text>
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text>date d'xpiration {card.exp}</Text>
            </ListItem>
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {loading ? <Spinner /> : <Text>Solde {singleCard.sold} DZD</Text>}
            </ListItem>
          </List>

          <Button
            block
            style={{marginBottom: 15}}
            onPress={() =>
              navigation.navigate('CameraModule', {
                card,
              })
            }>
            <Text>Payer</Text>
          </Button>
          <Button block>
            <Text>Modifier</Text>
          </Button>
        </ScrollView>
      </Body>
    </Container>
  );
};

export default SingleCard;

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
