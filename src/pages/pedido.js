/* eslint-disable prefer-template */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import {
  View,
  Text,
  StyleSheet, TouchableOpacity, Dimensions, FlatList, TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
import { removeItem, addQuantity, subtractQuantity } from '~/store/ducks/carrinhoprodutos';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pedidobox: {
    flex: 1,
  },

  titulo_mesa: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 30,
  },

  lista_pedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  total_pedido: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    fontSize: 20,
    marginTop: 10,
  },

  btnLogin: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: '#17EE42',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  Text: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  TextD: {
    fontSize: 20,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 150,
  },

  TextP: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  TextQ: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  containerProduto: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerProdutoinfo: {
    flexDirection: 'column',
  },
});

export class pedido extends Component {
    static navigationOptions = ({ navigation }) => {
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      return {
        headerTransparent: false,
        title: 'Pedido Mesa-' + nr_mesa,
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
          />
        ),
      };
    }
    

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     pedido: this.props.pedidoItems,
    //   };
    // }


    componentDidMount() {

    }

    handleAddQty = (cd_produto) => {
      this.props.addQuantity(cd_produto);
    }

    handleRevQty = (cd_produto) => {
      this.props.subtractQuantity(cd_produto);
    }

    alteracaoEstadoMesa() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      this.props.navigation.navigate('MesaPage');
      return fetch('http://192.168.1.179:1337/mesaAtendimento/' + nr_mesa, {
        method: 'PUT',
      });
    }

    renderProduto = ({ item }) => (
      <View style={styles.containerProduto}>
        <View style={styles.containerProdutoinfo}>
          <Text style={styles.TextD}>{item.ds_produto}</Text>
          <Text style={styles.TextP}>R${item.pr_produto.toFixed(2)}</Text>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={() => this.handleRevQty(item.cd_produto)}>
            <Icon
              name="md-remove"
              type="ionicon"
              color="#ff0000"
              size={20}
              raised
            />
          </TouchableOpacity>
          <Text style={styles.TextQ}> {item.quantity} </Text>
          <TouchableOpacity onPress={() => this.handleAddQty(item.cd_produto)}>
            <Icon
              name="md-add"
              type="ionicon"
              color="#ff0000"
              size={20}
              raised
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    render() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      return (
        <View style={styles.container}>
          {/* {this.props.pedidoItems.length > 0 ? ( */}
            <View style={styles.pedidobox}>

              <FlatList
                style={styles.itemList}
                data={this.props.pedidoItems}
                extraData={this.props}
                keyExtractor={item => String(item.cd_produto)}
                renderItem={this.renderProduto}
              />
              
              <View style={styles.total_pedido}>
              {/* https://stackoverflow.com/questions/51626700/in-react-redux-how-to-calculate-a-total-price-for-a-shopping-cart */}
                <Text style={styles.TextD}> Total: R$ {this.props.total.toFixed(2)}</Text>
                <Text style={styles.TextD}> Total: R$ {this.props.carrinhoReducer}</Text>
              </View>

              <TouchableOpacity style={styles.btnLogin} onPress={() => this.alteracaoEstadoMesa()}>
                <Text style={styles.Text}>Enviar Pedido </Text>
              </TouchableOpacity>
            </View>
          {/* ) : <Text>Sem Produtos a serem enviados</Text> */}
          {/* } */}
        </View>
      );
    }
}

const mapStateToProps = state => ({
  pedidoItems: state.carrinhoReducer.addedItems,
  total: state.carrinhoReducer.total,
  // addedItems: state.addedItems,
});

// const mapDispatchToProps = dispatch => bindActionCreators(ProdutoActions, dispatch);

const mapDispatchToProps = dispatch => ({
  removeItem: cd_produto => (dispatch(removeItem(cd_produto))),
  addQuantity: cd_produto => (dispatch(addQuantity(cd_produto))),
  subtractQuantity: cd_produto => (dispatch(subtractQuantity(cd_produto))),
});

export default connect(mapStateToProps, mapDispatchToProps)(pedido);
