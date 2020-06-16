import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {View, Icon} from 'native-base';

class ScanScreen extends Component {
  onSuccess = e => {
    const object = {
      data: e.data,
      card: this.props.route.params.card,
    };
    this.props.navigation.navigate('PaymentSucess', object);
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        //flashMode={RNCamera.Constants.FlashMode.torch}

        // containerStyle={{
        //   backgroundColor: 'red',
        //   display: 'flex',
        //   justifyContent: 'space-between',
        //   flex: 1,
        //   flexWrap: 'wrap',
        // }}
        bottomViewStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
        topViewStyle={{
          display: 'none',
        }}
        bottomContent={
          <>
            <Text style={styles.buttonText}>Scannez le code Qr</Text>
            <Icon
              type="Feather"
              name="camera"
              style={{color: 'black', fontSize: 50}}
            />
          </>
        }
        showMarker={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'black',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
