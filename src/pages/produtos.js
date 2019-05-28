/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProdutoActions } from '~/store/ducks/produtos';

import {
  View, Text, StatusBar, TouchableOpacity, FlatList, ProgressBarAndroid, StyleSheet, ToastAndroid,
} from 'react-native';

const styles = StyleSheet.create({
  containerProduto: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  boxProduto: {

  },
  textProduto: {
    fontSize: 18,
  },
  textPreco: {
    fontSize: 16,
  },
  test: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#DB4437',
    borderRadius: 5,
    height: 25,
  },
});
// static propTypes = {
//   prop: PropTypes,
// }

export class produtos extends Component {
    static navigationOptions = ({ navigation, navigate }) => ({
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
          onPress={() => { navigation.navigate('PedidoPage'); }}
          // onPress={navigation.navigate('PedidoPage')}
        />
      ),
    })

    state = {
      produtos: [],
      count: 0,
    };

    componentDidMount() {
      this.getProdutosApi();
      this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    handleAddCart = () => {
      ToastAndroid.show('Produto adicionado ao pedido', ToastAndroid.SHORT);
      this.setState({ count: this.state.count + 1 });
    }

    _increaseCount = () => {
      this.setState({ count: this.state.count + 0.01 });
    };

    getProdutosApi = async () => fetch('http://192.168.1.179:1337/produtoS/19')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          produtos: responseJson,
        });
      })

    renderProduto = ({ item }) => (
      <View style={styles.containerProduto}>
        <View style={styles.boxProduto}>
          <Text style={styles.textProduto}>{item.ds_produto} </Text>
          <Text style={styles.textPreco}>R${item.pr_produto.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={this.props.addProduto}>
          <Text style={styles.test}> Adicionar </Text>
        </TouchableOpacity>
      </View>
    );

    render() {
      return (
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#25CBCB" />
          <Text> Pedido tem {this.props.produtos.length} itens a serem enviados</Text>
          {/* <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.count}
          />
          <Text> Items no Carrinho: {this.state.count}</Text> */}
          
          <FlatList
            style={styles.flat}
            data={this.state.produtos}
            // eslint-disable-next-line no-unused-vars
            keyExtractor={({ id }, index) => `id${index}`}
            renderItem={this.renderProduto}
          />
        </View>
      );
    }
}

const mapStateToProps = state => ({
  produtos: state.produtos,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProdutoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(produtos);
