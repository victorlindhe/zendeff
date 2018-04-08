import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import ColoredButton from 'zendeff/components/coloredButton';
import WeightEntriesCollection from 'zendeff/domains/weightEntries/WeightEntriesCollection.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * The page to enter weight measurements
 */
export default class WeightForm extends React.Component {
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

    this._save = this._save.bind(this);

    this._load();
  }

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

  _save = async () => {
    this.state.weightEntries.addEntry({ 
      date: this.state.date, 
      weight: this.state.weight,
      waist: this.state.waist
    });

    console.log('saving: ');
    console.log(this.state.weightEntries.toJSON());

    await AsyncStorage.setItem(Globals.DATA_ENTRIES, this.state.weightEntries.toJSON());

    // To trigger re-render
    this.setState({
      weightEntries: this.state.weightEntries
    });
  }

  render() {
    if(!this.state.weightEntries) return null;

    const todaysEntry = this.state.weightEntries.getByDate(this.state.date);

    if(!todaysEntry) {
      return(
        <SafeAreaView style={[styles.view, styles.centered]}>
          <View style={[styles.innerView, styles.centered]}>
            <TextInput
              placeholder="Weight (kg)"
              value={this.state.weight}
              onChangeText={(v) => { this.setState({ weight: parseInt(weight) }) }}
              style={[styles.superBigFont, styles.centeredText, styles.width70]}
            />
            <TextInput
              placeholder="Waist (cm)"
              value={this.state.waist}
              onChangeText={(v) => { this.setState({ waist: parseInt(waist) }) }}
              style={[styles.superBigFont, styles.centeredText, styles.width70, styles.marginTop]}
            />
            <ColoredButton 
              title="Save" 
              onPress={this._save}
              styles={[styles.positive, styles.width70, styles.marginTop]} 
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}