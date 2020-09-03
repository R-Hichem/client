import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'native-base';

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
export default MyButton;
