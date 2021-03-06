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
import {StyleSheet, Image, Modal, Alert, ActivityIndicator} from 'react-native';
import {
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import axios from 'axios';
import {AuthContext} from './AuthProvider';
import {baseURL} from './baseURL';
import MyCardComponent from './MyCardComponent';
import LinearGradient from 'react-native-linear-gradient';
import CreditCard from 'react-native-credit-card';
import MyCustomCardThatDoesNotFlip from './MyCustomCardThatDoesNotFlip';
axios.defaults.baseURL = baseURL;

const TestComponent = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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
        {/* <Text style={{fontSize: 20}}>Mise à jour des informations ...</Text>
        <Spinner color="blue" size={100} /> */}
        <ActivityIndicator />
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
        end={{x: 0.5, y: 1.0}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
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
          </View>

          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              logout();
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#F5F1ED',
                fontWeight: 'bold',
                textAlign: 'right',
              }}>
              <Icon
                type="FontAwesome5"
                name="power-off"
                style={{margin: 10, color: 'white', fontSize: 20}}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Body>
        <ScrollView>
          {cards.reverse().map(card => {
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
            return (
              <TouchableOpacity
                key={card.id}
                onLongPress={() => {
                  navigation.navigate('UniqueCardSettings', {
                    card,
                  });
                  /*
                  alert('TODO: modifier ? supprimer ?');
                  axios
                    .post('/api/removeCard/' + card.id)
                    .then(resposne => {
                      console.log(resposne.data);
                      setLoading(false);
                      alert('card removed');
                      navigation.navigate('Home');
                    })
                    .catch(error => {
                      console.log(error);
                      setLoading(false);
                      alert("une erreur c'est produite");
                    });*/
                }}
                onPress={() =>
                  navigation.navigate('SingleCard', {
                    card,
                  })
                }
                style={{
                  marginVertical: 15,
                }}>
                {/* <MyCardComponent
                  name={card.name.toUpperCase()}
                  number={card.card_number}
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
                />
              </TouchableOpacity>
            );
            // return <CreditCard navigation={navigation} card={card} />;
          })}

          <AddCreditCard navigation={navigation} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                <TouchableHighlight
                  style={{...styles.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Body>
    </Container>
  );
};

export default TestComponent;

// const CreditCard = ({navigation, card}) => {
//   return (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('SingleCard', {
//           card,
//         })
//       }>
//       <Image
//         source={require('./rsz_visa_1.png')}
//         style={{height: 200, width: 300, marginVertical: 15}}
//       />
//     </TouchableOpacity>
//   );
// };

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
