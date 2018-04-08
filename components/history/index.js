import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import ColoredButton from 'zendeff/components/coloredButton';
import WeightForm from 'zendeff/components/weightForm';
import Stats from 'zendeff/components/stats';
import WeightEntriesCollection from 'zendeff/domains/weightEntries/WeightEntriesCollection.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * Displays list of current data, last first
 */
export default class History extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'History',
      headerStyle: GlobalStyles.primaryBackground,
      headerTintColor: '#fff',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddEntry')}
          title='Add day'
          color="#fff"/>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
    this._load();
  }

  /*
   * Loads stored weightEntries
   */
  _load = async () => {
    const weightEntries = await AsyncStorage.getItem(Globals.DATA_ENTRIES);
    let weightEntriesCollection = new WeightEntriesCollection(weightEntries);

    this.setState({
      weightEntries: weightEntriesCollection
    });
  }

  /* 
   * Renders list of entries
   */
  render() {
    return null
  }
}