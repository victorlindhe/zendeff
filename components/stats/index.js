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
    let interval = this.props.interval;
    let averageWeight = this.props.weightEntries.getAverage(interval, 'weight');

    return(
      <View style={[styles.innerView, styles.centered]}>
        <Text style={[styles.superBigFont, styles.centeredText, styles.fullWidth]}>{averageWeight} kg</Text>
      </View>
    );
  }
}