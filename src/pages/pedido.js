/* eslint-disable prefer-template */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import {
  View,
  Text,
  StyleSheet, TouchableOpacity, Dimensions, FlatList,
} from 'react-native';

import { connect } from 'react-redux';


width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 20,
    marginTop: 10,
  },

  btnLogin: {
    flexDirection: 'row',
    width: width,
    height: 45,
    backgroundColor: '#17EE42',
    justifyContent: 'center',
    marginTop: 15,
  },

  Text: {
    fontSize: 30,
  },
});

export default class Pedido extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerTransparent: false,
      title: 'Pedido',
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
    })

    constructor(props) {
      super(props);
      this.state = {
        pedidos: this.props.pedidos,
        porra: 0,
      };
    }

    componentDidMount() {

    }

    alteracaoEstadoMesa() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      this.props.navigation.navigate('MesaPage');
      return fetch('http://192.168.1.179:1337/mesaAtendimento/' + nr_mesa, {
        method: 'PUT',
      });
    }

    renderProduto = ({ item, index }) => {

      return (
        <View style={styles.lista_pedido}>
          <Text> R$ 10.00 </Text>
        </View>
      );
    }

    render() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      const { pedidos } = this.props;
      const test = 1;
      return (
        <View style={styles.container}>
          {test > 0 ? (
            <View>
              <View style={styles.titulo_mesa}>
                <Text> Mesa {nr_mesa} </Text>
              </View>
              <FlatList
                style={styles.itemList}
                            // data={this.props.cartItems}
                // eslint-disable-next-line prefer-template
                // eslint-disable-next-line no-unused-vars
                keyExtractor={({ id }, index) => 'id' + index}
                renderItem={this.renderProduto}
              />

              <View style={styles.total_pedido}>
                <Text> Total: R$ </Text>
              </View>

              {/* <Text> Itens a serem pedidos: {this.props.cartItems.length} </Text> */}
              <TouchableOpacity style={styles.btnLogin} onPress={() => this.alteracaoEstadoMesa()}>
                <Text style={styles.Text}>Enviar Pedido </Text>
              </TouchableOpacity>
            </View>
          ) : <Text>Sem Produtos a serem enviados</Text>
          }
        </View>
      );
    }
}
