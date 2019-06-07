/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#1fa3a3',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1.70,
    height: 85,
    width: 55,
    borderRadius: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
});


export default class Grupo extends Component {
    static navigationOptions = ({ navigation, navigate }) => ({
      headerTransparent: false,
      title: 'Grupos',
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
        <React.Fragment>
          <Icon
            name="md-basket"
            type="ionicon"
            color="#25CBCB"
            size={25}
          />
        </React.Fragment>
      ),
    })

    constructor() {
      super();
      this.state = {
        grupos: [],
      };
    }

    componentDidMount() {
      this.getGruposApi();
    }

    getGruposApi = async () => fetch('http://192.168.1.113:1337/grupo')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          grupos: responseJson,
        });
      })

    renderGrupo = ({ item, index }) => {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} />; }
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SubGrupoPage', {
            cd_grupo: item.cd_grupo,
            nr_mesa,
          })}
          style={styles.item}
        >
          <View>
            <Text style={styles.text}>{item.ds_grupo}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    render() {
      const { navigation } = this.props;
      const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
      const numColumns = 2;

      const formatData = (grupos, numColumns) => {
        const numberOfFullRows = Math.floor(grupos.length / numColumns);

        let numberOfElementsLastRow = grupos.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
          grupos.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
          numberOfElementsLastRow++;
        }

        return grupos;
      };

      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#25CBCB" />
          <FlatList
            data={formatData(this.state.grupos, numColumns)}
            style={styles.container}
            keyExtractor={({ id }, index) => `id${index}`}
            renderItem={this.renderGrupo}
            numColumns={numColumns}
          />
        </View>
      );
    }
}
