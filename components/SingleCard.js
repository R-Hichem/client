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
import {Image, View} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const SingleCard = ({route, navigation}) => {
  const {card} = route.params;
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
              <Text>Solde {card.sold} DZD</Text>
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
