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
import { bindActionCreators } from 'redux';
import { Creators as ProdutoActions } from '~/store/ducks/produtos';

width = Dimensions.get('window').width;

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

  TextP: {
    fontSize: 20,
  },

  containerProduto: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
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

    constructor(props) {
      super(props);
      this.state = {
        pedido: this.props.pedidoItems,
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

    renderProduto = ({ item }) => (
      <View style={styles.containerProduto}>
        <Text style={styles.TextP}>1x {item.ds_produto} </Text>
        <Text style={styles.TextP}>R${item.pr_produto.toFixed(2)}</Text>
      </View>
    );

    render() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      console.log('teste de pedido ====')
      console.log(this.props.pedidoItems)
      return (
        <View style={styles.container}>
          {this.props.pedidoItems.length > 0 ? (
            <View style={styles.pedidobox}>

              <FlatList
                style={styles.itemList}
                data={this.props.pedidoItems}
                keyExtractor={item => String(item.cd_produto)}
                renderItem={this.renderProduto}
              />
              
              <View style={styles.total_pedido}>
                <Text style={styles.TextP}> Total: R$ </Text>
              </View>

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

const mapStateToProps = state => ({
  pedidoItems: state.produtos,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProdutoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(pedido);
