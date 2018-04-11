import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * Component to show current progress
 */
export default class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
   * Renders the stats
   */
  render() {
    let weightDiffWord = this.props.weightDiff < 0 ? 'Down' : 'up';
    let waistDiffWord = this.props.waistDiff < 0 ? 'Down' : 'up';
    let weightClass = this.props.weightDiff < 0 ? styles.positiveText : styles.negativeText;
    let waistClass = this.props.waistDiff < 0 ? styles.positiveText : styles.negativeText;

    return(
      <View style={[styles.innerView, styles.centered]}>
        <View style={[styles.fullWidth, styles.borderBottom, styles.paddingBottom]}> 
          <Text style={[styles.regularFont, styles.fullWidth]}>Current weight</Text>
          <Text style={[styles.superBigFont, styles.fullWidth]}>{this.props.weight} kg</Text>
          <Text style={[styles.regularFont, styles.fullWidth]}>
            {weightDiffWord} <Text style={[styles.bold, weightClass]}>{Math.abs(this.props.weightDiff)} kg</Text> in {this.props.interval} days
          </Text>
        </View>
        <Text style={[styles.regularFont, styles.fullWidth, styles.marginTop]}>Current waist</Text> 
        <Text style={[styles.superBigFont, styles.fullWidth]}>{this.props.waist} cm</Text>
        <Text style={[styles.regularFont, styles.fullWidth]}>
          {weightDiffWord} <Text style={[styles.bold, waistClass]}>{Math.abs(this.props.waistDiff)} kg</Text> in {this.props.interval} days
        </Text>
      </View>
    );
  }
}