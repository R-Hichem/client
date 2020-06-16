import React from 'react';
import {Container, Header, Text, Icon, Body, Card, CardItem} from 'native-base';
import {Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
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
          <CreditCard navigation={navigation} />
          <CreditCard navigation={navigation} />
          <CreditCard navigation={navigation} />
          <CreditCard navigation={navigation} />
          <CreditCard navigation={navigation} />
          <CreditCard navigation={navigation} />
        </ScrollView>
      </Body>
    </Container>
  );
};

export default Home;

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
