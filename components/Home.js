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
import MyCardComponent from './MyCardComponent';

axios.defaults.baseURL = baseURL;

const Home = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  useEffect(() => {
    axios
      .post('/api/cards')
      .then(resposne => {
        console.log(resposne.data);

        setCards(resposne.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);
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
          e wallet
        </Text>
        <Icon
          type="Feather"
          name="credit-card"
          style={{marginLeft: 10, color: 'white', fontSize: 28}}
        />
      </Header>
      <Body>
        <ScrollView>
          {cards.map(card => {
            return (
              <TouchableOpacity>
                <MyCardComponent
                  name={card.name}
                  number={card.card_number.match(/.{4}/g).join(' ')}
                  expiry="04/2028"
                  type="Master Card"
                />
              </TouchableOpacity>
            );
            return <CreditCard navigation={navigation} card={card} />;
          })}

          <AddCreditCard navigation={navigation} />
        </ScrollView>
      </Body>
    </Container>
  );
};

export default Home;

const CreditCard = ({navigation, card}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SingleCard', {
          card,
        })
      }>
      <Image
        source={require('./rsz_visa_1.png')}
        style={{height: 200, width: 300, marginVertical: 15}}
      />
    </TouchableOpacity>
  );
};

const AddCreditCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.addCard}
      onPress={() => navigation.navigate('AddCard')}>
      <Icon type="Feather" name="plus" style={{color: 'black', fontSize: 50}} />
      <Text style={{color: 'black', fontSize: 20}}>
        Ajouter une nouvelle carte
      </Text>
    </TouchableOpacity>
  );
};

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
});
