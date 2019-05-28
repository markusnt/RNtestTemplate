/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#1dff00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    margin: 1.70,
    height: 85,
    borderRadius: 5,
  },

  itemInvisible: {
    backgroundColor: 'transparent',
  },

  mesaAtendimento: {
    backgroundColor: '#ff0000',
  },

  mesaPreConta: {
    backgroundColor: '#f2ff00',
  },

  text: {
    fontSize: 30,
    color: '#000000',
  },

  textMesaAtendimento: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default class Mesa extends Component {
    static navigationOptions = ({ navigation, navigate }) => ({
      headerTransparent: false,
      headerLeft: null,
      title: 'Mesas',
      headerStyle: {
        backgroundColor: '#25CBCB',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
      },
    })

    constructor() {
      super();
      this.state = {
        mesas: [],
        refreshing: false,
      };
    }

    componentDidMount() {
      this.getMesasApi();
    }

  getMesasApi = async () => {
    this.setState({ loading: true });
    fetch('http://192.168.1.179:1337/mesa')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          mesas: responseJson,
          loading: false,
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }


  renderMesa = ({ item, index }) => {
    if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
    if (item.st_mesa === "atendimento") {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GrupoPage', {
            nr_mesa: item.nr_mesa
          })}
          style={[styles.item, styles.mesaAtendimento]}>
          <View>
            <Text style={styles.textMesaAtendimento}>{item.cd_mesa}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (item.st_mesa === "pre-conta") {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GrupoPage', {
            nr_mesa: item.nr_mesa,
          })}
          style={[styles.item, styles.mesaPreConta]}>
          <View>
            <Text style={styles.text}>{item.cd_mesa}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('GrupoPage', {
          nr_mesa: item.nr_mesa,
        })}
        style={styles.item}>
        <View>
          <Text style={styles.text}>{item.cd_mesa}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.getMesasApi()
    })
  }

  render() {

    const numColumns = 4

    const formatData = (mesas, numColumns) => {
      const numberOfFullRows = Math.floor(mesas.length / numColumns);

      let numberOfElementsLastRow = mesas.length - (numberOfFullRows * numColumns);
      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        mesas.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
      }

      return mesas;
    };

    return (

      <FlatList
        data={formatData(this.state.mesas, numColumns)}
        style={styles.container}
        keyExtractor={({ id }, index) => 'id' + index}
        renderItem={this.renderMesa}
        numColumns={numColumns}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />


    );
  }
}

// https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
// USAR ESSE LINK PARA fazer grid
