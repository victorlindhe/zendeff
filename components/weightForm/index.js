import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import ColoredButton from 'zendeff/components/coloredButton';
import WeightEntriesCollection from 'zendeff/domains/weightEntries/WeightEntriesCollection.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * The form to enter weight measurements
 */
export default class WeightForm extends React.Component {
  constructor(props) {
    super(props);
    this._save = this._save.bind(this);
  }

  /*
   * Saves the entry to AsyncStorage and notifies parent component
   */
  _save = async () => {
    this.props.save({ 
      date: this.props.date, 
      weight: this.state.weight,
      waist: this.state.waist
    });
  }

  /*
   * Renders the form to save weight and waist data
   */
  render() {
    let weight = this.props.weight;
    let waist = this.props.waist;

    return(
      <View style={[styles.innerView, styles.centered]}>
        <TextInput
          placeholder="Weight (kg)"
          value={weight ? weight.toString() : null}
          onChangeText={(v) => { this.setState({ weight: parseFloat(v) }) }}
          style={[styles.superBigFont, styles.centeredText, styles.width70]}
        />
        <TextInput
          placeholder="Waist (cm)"
          value={waist ? waist.toString() : null}
          onChangeText={(v) => { this.setState({ waist: parseFloat(v) }) }}
          style={[styles.superBigFont, styles.centeredText, styles.width70, styles.marginTop]}
        />
        <ColoredButton 
          title="Save" 
          onPress={this._save}
          styles={[styles.positive, styles.width70, styles.marginTop]} 
        />
      </View>
    );
  }
}