import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import ColoredButton from 'zendeff/components/coloredButton';
import WeightForm from 'zendeff/components/weightForm';
import Stats from 'zendeff/components/stats';
import WeightEntriesCollection from 'zendeff/domains/weightEntries/WeightEntriesCollection.js';
import moment from 'moment';

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
    this.state = {
      date: this._getToday()
    };

    this.save = this.save.bind(this);
    this._backDate = this._backDate.bind(this);
    this._forwardDate = this._forwardDate.bind(this);
    this._renderForwardButton = this._renderForwardButton.bind(this);
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

    this.setState({
      ...this._getWeightState(this.state.date)
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
      weightEntries: weightEntries,
    });
  }

  /*
   * Steps back a date
   */
  _backDate() {
    this._setNewDate(moment(this.state.date).subtract(1, 'days'));
  }

  /*
   * Steps forward a date
   */
  _forwardDate() {
    this._setNewDate(moment(this.state.date).add(1, 'days'));
  }

  /*
   * Sets new date and updates weight form
   */
  _setNewDate(date) {
    this.setState({
      date: date,
      ...this._getWeightState(date)
    });
  }

  /*
   * Returns weight parameters to state
   */
  _getWeightState(date) {
    const entry = this.state.weightEntries.getByDate(date.toDate());

    if(!entry) {
      return {
        weight: null,
        waist: null
      }
    }
    
    return {
      weight: entry.weight,
      waist: entry.waist
    }
  }

  /*
   * Renders forward button if date < today
   */
  _renderForwardButton() {
    if(this.state.date.isBefore(this._getToday())) {
      return (
        <Button
          onPress={this._forwardDate}
          color="#000"
          title=">" />
      );
    }

    return null
  }

  /*
   * Returns today by midnight
   */
  _getToday() {
    return moment().startOf('day');
  }

  /* 
   * Renders statistics view if today has been entered.
   * Otherwise it renders the weight form.
   */
  render() {
    let date = this.state.date.format('dddd, MMMM Do');

    if(!this.state.weightEntries) return null

    return(
      <SafeAreaView style={[styles.view, styles.centered]}>
        <View style={[styles.innerView, styles.row, styles.centered, { marginBottom: 40 }]}>
          <Button
            onPress={this._backDate}
            color="#000"
            title="<" />
          <Text style={[styles.bigFont]}>{date}</Text>
          {this._renderForwardButton()}
        </View>
        <WeightForm 
            date={this.state.date.toDate()}
            weight={this.state.weight} 
            waist={this.state.waist} 
            save={this.save} 
          />
      </SafeAreaView>
    );
  }
}