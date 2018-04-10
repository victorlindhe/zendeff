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
      weight: newEntry.weight,
      waist: newEntry.waist
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
    let date = this.state.date.format('YYYY-MM-DD');
    let disableForward = !this.state.date.isBefore(this._getToday());

    if(!this.state.weightEntries) return null

    return(
      <SafeAreaView style={[styles.view]}>
        <View style={[styles.innerView, styles.centered, styles.row, styles.marginTop]}>
          <View style={[styles.flexStart]}>
            <Button
                onPress={this._backDate}
                color="#000"
                title="< Back"
                style={[styles.fullWidth]} />
          </View>
          <Text style={[styles.regularFont]}>{date}</Text>
          <View style={[styles.flexEnd]}>
            <Button
                onPress={this._forwardDate}
                color="#000"
                title="Forward >"
                style={[styles.col2]}
                disabled={disableForward} />
          </View>
        </View>
        <View style={[styles.innerView, styles.centered, {flex: 1}]}>
          <WeightForm 
            date={this.state.date.toDate()}
            weight={this.state.weight} 
            waist={this.state.waist} 
            save={this.save} 
          />
        </View>
      </SafeAreaView>
    );
  }
}