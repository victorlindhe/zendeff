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
 * The daily view of usage
 */
export default class Today extends React.Component {
  static navigationOptions = {
    title: 'Today',
    headerStyle: GlobalStyles.primaryBackground,
    headerTintColor: '#fff'
  }

  constructor(props) {
    super(props);

    // Default to today's date if not stated
    this.state = {
      date: this.props.date || new Date(new Date().toDateString())
    };

    this.save = this.save.bind(this);
    this._load();
  }

  /*
   * Adds listener to update whenever screen is focused
   */
  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this._load();
    });
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
   * Renders a weight form to enter today's data
   */
  _renderWeightForm() {
    return(
      <SafeAreaView style={[styles.view, styles.centered]}>
        <WeightForm 
          date={this.state.date}
          weight={this.state.weight} 
          waist={this.state.waist} 
          save={this.save} 
        />
      </SafeAreaView>
    );
  }

  /*
   * Renders Stats component by supplying weight entries
   */
  _renderStats() {
    let interval = this.state.settings.interval;
    let averageWeight = this.state.weightEntries.getAverage(interval, 'weight');
    let averageWaist = this.state.weightEntries.getAverage(interval, 'waist');
    let weightDiff = averageWeight - this.state.weightEntries.getAverage(interval*2, 'weight', interval);
    let waistDiff = averageWaist - this.state.weightEntries.getAverage(interval*2, 'waist', interval);

    return(
      <SafeAreaView style={[styles.view, styles.centered]}>
        <Stats 
          weight={averageWeight.toFixed(2)}
          weightDiff={weightDiff.toFixed(2)}
          waist={averageWaist.toFixed(2)}
          waistDiff={waistDiff.toFixed(2)}
          interval={interval}
        />
      </SafeAreaView>
    );
  }

  /* 
   * Renders statistics view if today has been entered.
   * Otherwise it renders the weight form.
   */
  render() {
    if(!this.state.weightEntries) return null;
    const todaysEntry = this.state.weightEntries.getByDate(this.state.date);

    if(!todaysEntry) {
      return this._renderWeightForm();
    } else {
      return this._renderStats();
    }
  }
}