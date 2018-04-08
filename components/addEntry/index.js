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
 * View for adding historical entries
 */
export default class AddEntry extends React.Component {
  static navigationOptions = {
    title: 'Add day',
    headerStyle: GlobalStyles.primaryBackground,
    headerTintColor: '#fff',
    headerBackTitleStyle: {
      color: '#fff'
    }
  }

  constructor(props) {
    super(props);

    // Default to today's date if not stated
    this.state = {};
    this.save = this.save.bind(this);
    this._load();
  }

  /*
   * Loads settings and stored weightEntries
   */
  _load = async () => {
    const settings = await AsyncStorage.getItem(Globals.SETTINGS_KEY);
    const weightEntries = await AsyncStorage.getItem(Globals.DATA_ENTRIES);

    let settingsParsed = JSON.parse(settings);
    let weightEntriesCollection = new WeightEntriesCollection(weightEntries);

    this.setState({
      settings: settingsParsed,
      weightEntries: weightEntriesCollection
    });
  }

  /*
   * Listener function for when saving weight form
   */
  save = async (newEntry) => {
    let weightEntries = this.state.weightEntries;
    weightEntries.addEntry(newEntry);
    await AsyncStorage.setItem(Globals.DATA_ENTRIES, weightEntries.toJSON());
    
    this.setState({
      weightEntries: weightEntries
    });
  }

  /* 
   * Renders statistics view if today has been entered.
   * Otherwise it renders the weight form.
   */
  render() {
    return(
      <SafeAreaView style={[styles.view, styles.centered]}>
        <Text>Hello</Text>
      </SafeAreaView>
    );
  }
}