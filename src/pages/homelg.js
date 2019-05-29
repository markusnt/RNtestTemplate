/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar, View, TouchableOpacity,
} from 'react-native';

import bgImage from '~/resource/img/FundoInicialBlur.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },

  btnEntrar: {
    alignItems: 'center',
    width: 250,
    height: 75,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    backgroundColor: '#25CBCB',
  },

  btnText: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default class HomeLg extends Component {
  static navigationOptions = {
    headerTransparent: true,
  }

  render() {
    return (
      // <ImageBackground source={bgImage} style={styles.container}></ImageBackground>
      <ImageBackground
        source={bgImage}
        style={styles.container}
        resizeMode="cover"
      >
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        <TouchableOpacity style={styles.btnEntrar} onPress={() => this.props.navigation.navigate('MesaPage')}>
          <Text style={styles.btnText}> Entrar </Text>
        </TouchableOpacity>
        
      </ImageBackground>
    );
  }
}
