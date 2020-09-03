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
import LinearGradient from 'react-native-linear-gradient';

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
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
    });

    return unsubscribe;
  }, [navigation]);

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
      <Body>
        <ScrollView>
          {cards.map(card => {
            return (
              <TouchableOpacity
                onLongPress={() => alert('TODO: modifier ? supprimer ?')}
                onPress={() =>
                  navigation.navigate('SingleCard', {
                    card,
                  })
                }
                style={{
                  marginVertical: 15,
                }}>
                <MyCardComponent
                  name={card.name}
                  number={card.card_number}
                  expiry={card.exp}
                  type={card.type}
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
