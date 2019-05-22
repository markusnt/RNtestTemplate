import React, { Component } from 'react';
import api from '~/services/api';

import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar, View,
} from 'react-native';

export default class Produto extends Component {
  static navigationOptions = {
    title: 'Produto',
  };

  state = {
        produtos: []
    }

  componentDidMount() {
    this.loadProdutos();
  }

  loadProdutos = async () => {
    return await fetch(`${api}/produtoS/19`)
    .then((response) => response.json())
    .then((responseJson) => {

        this.setState({
            produtos: responseJson,
        })
    })
  }

  render() {
    return (
      <View>
        <Text> Brabo </Text>

      </View>
    );
  }
}