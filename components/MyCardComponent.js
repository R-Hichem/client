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
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const MyCardComponent = ({name, number, expiry, type}) => {
  return (
    <LinearGradient
      useAngle={true}
      angle={25}
      angleCenter={{x: 0.5, y: 0}}
      colors={['#1399cd', '#0f509e']}
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      style={styles.credit_card}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {/* <ImageBackground
          source={require('./images/visa_logo.png')}
          style={{width: 50, height: 50, backgroundColor: 'green'}}
        /> */}
        <Text
          style={{
            ...styles.credit_card__info_label,
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {type}
        </Text>
      </View>
      <Text style={styles.credit_card__number}>{number}</Text>
      <View style={styles.credit_card__info}>
        <View style={styles.creditCardinfoName}>
          <Text style={styles.credit_card__info_label}>CARDHOLDER'S NAME</Text>
          <Text style={{fontSize: 25, color: 'white'}}>{name}</Text>
        </View>
        <View style={styles.creditCardinfoExpirt}>
          <Text style={styles.credit_card__info_label}>Valid Up To</Text>
          <Text style={{fontSize: 25, color: 'white'}}>{expiry}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default MyCardComponent;

const styles = StyleSheet.create({
  credit_card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 350,
    height: 230,
    padding: 25,
    borderRadius: 15,
    color: 'white',
    //backgroundImage: 'linear-gradient(25deg, #0f509e, #1399cd)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  credit_card__number: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: "'Fjalla One', sans-serif",
    fontSize: 30,
    color: 'white',
  },
  credit_card__info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: "'Fjalla One', sans-serif",
    fontSize: 25,
    color: 'white',
  },
  credit_card__info_label: {
    fontSize: 16,
    color: 'white',
  },
  credit_card__info_expiry: {
    display: 'flex',
    flexDirection: 'row',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: 'white',
  },
});
