import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * Collects different data based on gender
 */
export default class GenderBasedForm extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderMale() {
    return(
      <View style={[styles.innerView, styles.row, { marginTop: 20 }]}>
        <TextInput 
          style={[styles.fullWidth, styles.regularFont]}
          value={this.props.settings.neck ? this.props.settings.neck.toString() : ''} 
          onChangeText={(v) => { this.props.updateSettings('neck', parseInt(v)) }}
          placeholder="Neck (cm)"/>
      </View>
    );
  }

  _renderFemale() {
    return(
      <View style={[styles.innerView, styles.row, { marginTop: 20 }]}>
        <TextInput 
          style={[styles.col2, styles.regularFont]}
          value={this.props.settings.neck ? this.props.settings.neck.toString() : ''} 
          onChangeText={(v) => { this.props.updateSettings('neck', parseInt(v)) }} 
          placeholder="Neck (cm)"/>
        <TextInput 
          style={[styles.col2, styles.regularFont]}
          value={this.props.settings.hip ? this.props.settings.hip.toString() : ''} 
          onChangeText={(v) => { this.props.updateSettings('hip', parseInt(v)) }} 
          placeholder="Hip (cm)"/>
      </View>
    );
  }

  render() {
    if(this.props.settings.gender === 'male') {
      return this._renderMale();
    } else {
      return this._renderFemale();
    }
  }
}