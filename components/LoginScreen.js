import React, {useContext, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Button,
  Icon,
  Form,
  Item,
  Input,
} from 'native-base';
import {AuthContext} from './AuthProvider';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({navigation}) => {
  const {login, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          name="user"
          style={{margin: 10, color: 'white', fontSize: 20}}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#F5F1ED',
            fontWeight: 'bold',
          }}>
          Connexion
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
      <Content>
        {error ? (
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              marginTop: 30,
              fontSize: 18,
            }}>
            {' '}
            {error}{' '}
          </Text>
        ) : null}
        <Form style={styles.formTag}>
          <Item>
            <Input
              placeholder="E-mail"
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Mot de passe"
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              secureTextEntry={true}
            />
          </Item>
        </Form>

        <Button
          transparent
          style={{margin: 30}}
          onPress={() => login(email, password)}>
          <MyButton text="Seconnecter" iconName="credit-card" />
        </Button>
      </Content>
    </Container>
  );
};

export default LoginScreen;

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

const styles = StyleSheet.create({
  testHighlight: {
    backgroundColor: 'red',
  },
  horizentalCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.5,
  },
  titre: {
    fontSize: 22,
    color: 'white',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  formTag: {
    margin: 40,
  },
});
