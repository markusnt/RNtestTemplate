/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar, View, TouchableOpacity, TextInput,
} from 'react-native';

import bgImage from '~/resource/img/AquaMarine.png';
import logo from '~/resource/img/Inforservice.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingHorizontal: 20,
  },

  btnEntrar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 90,
    height: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(37, 198, 201, 0.50)',
    marginBottom: 180,
  },

  btnText: {
    fontSize: 30,
    color: '#FFF',
  },

  input: {
    width: Dimensions.get('window').width - 55,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#fff',
    marginHorizontal: 25,
    marginTop: 10,
  },

  logo: {
    width: 160,
    height: 220,
    marginBottom: 80,
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
        <StatusBar barStyle="light-content" backgroundColor="#25C6C9" />

        <Image source={logo} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Usuario..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          underlineColorAndroid="transparent"
          onChangeText={texto => this.setState({ usuario: texto })}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          underlineColorAndroid="transparent"
          onChangeText={texto => this.setState({ senha: texto })}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btnEntrar} onPress={() => this.props.navigation.navigate('MesaPage')}>
          <Text style={styles.btnText}> Entrar </Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}
