/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { addToCart, dataApi } from '~/store/ducks/carrinhoprodutos';

import {
  View, Text, StatusBar, TouchableOpacity, FlatList, StyleSheet, ToastAndroid,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#DB4437',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    height: 25,
  },
});
// static propTypes = {
//   prop: PropTypes,
// }

export class produtos extends Component {
    static navigationOptions = ({ navigation, navigate }) => {
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
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
            onPress={() => {
              navigation.navigate('PedidoPage', {
                nr_mesa: nr_mesa,
              });
            }}
          // onPress={navigation.navigate('PedidoPage')}
          />
        ),
      };
    }

    state = {
      items: [],
    };

    componentDidMount() {
      this.getProdutosApi();
    }
  
    getProdutosApi = async () => {
      const { navigation } = this.props;
      const CD_SUBGRUPO = navigation.getParam('CD_SUBGRUPO', 'NO-ID');
      fetch(`http://192.168.1.179:1337/produtoS/${CD_SUBGRUPO}`)
        .then(response => response.json())
        .then((responseJson) => {
          this.props.dataApi(responseJson);
          this.setState({
            items: responseJson,
          });
        });
    }

    // async getProdutosApi() {
    //   try {
    //     const response = await fetch(`http://192.168.1.179:1337/produtoS/${CD_SUBGRUPO}`)
    //   }
    // }


    handleAdd = (cd_produto) => {
      this.props.addToCart(cd_produto);
      ToastAndroid.show('Produto adicionado ao pedido', ToastAndroid.SHORT);
    }

    renderProduto = ({ item }) => (
      <View style={styles.containerProduto}>
        <TouchableOpacity style={styles.boxProduto}>
          <Text style={styles.textProduto}>{item.ds_produto} </Text>
          <Text style={styles.textPreco}>R${item.pr_produto.toFixed(2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleAdd(item.cd_produto)}>
          <Text style={styles.test}> Adicionar </Text>
        </TouchableOpacity>
      </View>
    );

    render() {
      return (
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#25CBCB" />
          <FlatList
            style={styles.flat}
            data={this.state.items}
            keyExtractor={item => String(item.cd_produto)}
            renderItem={this.renderProduto}
          />
        </View>
      );
    }
}

const mapStateToProps = state => ({
  items: state.items,
});

// const mapDispatchToProps = dispatch => bindActionCreators( carrinhoReducer, dispatch);
const mapDispatchToProps = dispatch => ({
  addToCart: cd_produto => (dispatch(addToCart(cd_produto))),
  dataApi: date => (dispatch(dataApi(date))),
});

export default connect(mapStateToProps, mapDispatchToProps)(produtos);
