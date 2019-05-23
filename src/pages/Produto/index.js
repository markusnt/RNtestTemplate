/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements'

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity, 
  Button,
} from 'react-native';

// import api from '~/services/api';
import ListaProdutos from '~/components/ListaProdutos';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    // paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  textPr: {
    color: '#2e2f30',
    fontSize: 16,
  },
  textStyle: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: '#1fa3a3',
    color: '#000',
    marginHorizontal: 25,
    marginTop: 10,
  },
  priceStyle: {
    backgroundColor: '#eee',
    width: 88,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 3,
  },
});

export default class Produto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: false,
      title: 'Produtos',
      headerStyle: {
        backgroundColor: '#25CBCB',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
      },
      headerRight: (
        <Icon
          name="md-basket"
          type="ionicon"
          color="#25CBCB"
          size={25}
          reverse
          onPress={navigation.getParam('increaseCount')}
        />
      ),
    };
  }

  state = {
    produtos: [],
    count: 0,
  };

  componentDidMount() {
    this.getProdutosApi();
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };


  getProdutosApi = async () => fetch('http://192.168.1.179:1337/produtoS/19') //cd_subgrupo
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        produtos: responseJson,
      });
    })

  renderProduto = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.textStyle} onPress={this.props.addItemToCart}>
        <Text style={styles.text}>{item.ds_produto} </Text>
        <View style={styles.sideProd} >
          <View style={styles.priceStyle}>
            <Text style={styles.textPr}>R${item.pr_produto.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text> Count: {this.state.count}</Text>
        <FlatList
          
          data={this.state.produtos}
          keyExtractor={({ id }, index) => `id${index}`}
          renderItem={this.renderProduto}
        />

        {/* <ListaProdutos /> */}
      </View>
    );
  }
}
