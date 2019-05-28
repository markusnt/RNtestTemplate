/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar,
} from 'react-native';

import bgImage from './../resource/img/backk.jpeg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.11,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').height * 0.11 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default class Home extends Component {
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
        <StatusBar hidden={true} />
        </ImageBackground>
    );
  }
}
