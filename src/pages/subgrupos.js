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
        marginTop: 4,
        margin: 1.70,
        height: 85,
        width: 55,
        borderRadius: 5
    },
    itemInvisible: {
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 20,
        color: '#FFF',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

});

export default class SubGrupo extends Component {
    static navigationOptions = ({ navigation, navigate }) => ({
        headerTransparent: false,
        title: 'SubGrupo',
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
            subgrupos: []
        }
    }

    componentDidMount() {
        this.getSubGruposApi();
    }


    getSubGruposApi = async () => {
        const { navigation } = this.props;
        const cd_grupo = navigation.getParam('cd_grupo', 'NO-ID');

        return await fetch('http://192.168.1.179:1337/subgrupoS/' + cd_grupo)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    subgrupos: responseJson,
                });
            })
    }

    renderSubGrupo = ({ item, index }) => {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProdutoPage', {
                CD_SUBGRUPO: item.cd_subgrupo,
                nr_mesa: nr_mesa
            })} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_subgrupo}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        const numColumns = 2

        const formatData = (subgrupos, numColumns) => {
            const numberOfFullRows = Math.floor(subgrupos.length / numColumns);

            let numberOfElementsLastRow = subgrupos.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                subgrupos.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return subgrupos;
        };

        return (
            <View style={styles.container}>
<StatusBar barStyle="light-content" backgroundColor="#25CBCB" />
                <FlatList
                    data={formatData(this.state.subgrupos, numColumns)}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderSubGrupo}
                    numColumns={numColumns}
                />

            </View>
        );
    }
}