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
    return(
      <View style={[styles.innerView, styles.centered]}>
        <Text style={[styles.regularFont, styles.centeredText, styles.fullWidth]}>Current stats</Text>
        <Text style={[styles.superBigFont, styles.centeredText, styles.fullWidth]}>{this.props.weight} kg / {this.props.waist} cm</Text>
      </View>
    );
  }
}