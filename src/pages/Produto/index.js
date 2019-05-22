import React, { Component } from 'react'

import {
  Text,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import api from '~/services/api';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default class Produto extends Component {
  static navigationOptions = {
    headerTransparent: true,
    title: 'Produtos',
  };

    state = {
      produtos: [],
    };

    componentDidMount() {
      this.getProdutosApi();
    }


  getProdutosApi = async () => {
    return fetch('http://192.168.1.179:1337/produtoS/19') //cd_subgrupo
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          produtos: responseJson,
        });
      });
  }

  renderProduto = ({ item }) => (
    <View>
      <Text>{item.ds_produto}  R${item.pr_produto.toFixed(2)}</Text>
    </View>
  )

  render() {
    return (
      <ImageBackground
        source={{
          uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <FlatList
          data={this.state.produtos}
          keyExtractor={({ id }, index) => `id${index}`}
          renderItem={this.renderProduto}
        />
      </ImageBackground>
    );
  }
}
