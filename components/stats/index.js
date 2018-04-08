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
    let weightDiffWord = this.props.weightDiff < 0 ? 'down' : 'up';
    let waistDiffWord = this.props.waistDiff < 0 ? 'down' : 'up';
    let weightClass = this.props.weightDiff < 0 ? styles.positiveText : styles.negativeText;
    let waistClass = this.props.waistDiff < 0 ? styles.positiveText : styles.negativeText;

    return(
      <View style={[styles.innerView, styles.centered]}>
        <Text style={[styles.regularFont, styles.centeredText, styles.fullWidth]}>Current stats</Text>
        <Text style={[styles.superBigFont, styles.centeredText, styles.fullWidth]}>{this.props.weight} kg / {this.props.waist} cm</Text>
        <Text style={[styles.regularFont, styles.centeredText, styles.marginTop]}>
          Weight {weightDiffWord} <Text style={[styles.bold, weightClass]}>{this.props.weightDiff} kg</Text> in {this.props.interval} days
        </Text>
        <Text style={[styles.regularFont, styles.centeredText, styles.marginTop]}>
          Waist {waistDiffWord} <Text style={[styles.bold, waistClass]}>{this.props.waistDiff} cm</Text> in {this.props.interval} days
        </Text>
      </View>
    );
  }
}