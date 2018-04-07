import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import Picker from 'zendeff/components/picker';
import ColoredButton from 'zendeff/components/coloredButton';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const styles = StyleSheet.create(GlobalStyles);

/*
 * Page for application settings
 */
export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: GlobalStyles.primaryBackground,
    headerTintColor: '#fff'
  }

  constructor(props) {
    super(props);
    this.state = {
      settings: Globals.DEFAULT_SETTINGS,
      showPicker: false
    };

    this._showPicker = this._showPicker.bind(this);
    this._save = this._save.bind(this);
  }

  _showPicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  _save() {
    console.log(this.state.settings);
  }

  render() {
    const genders = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    return(
      <View style={styles.view}>
        <View style={[styles.innerView, styles.row]}>
          <Text style={styles.regularFont}>Selected gender is {this.state.settings.gender}</Text>
          <ColoredButton title={this.state.showPicker ? 'Finish' : 'Edit'} onPress={this._showPicker} styles={[styles.flexEnd]} /> 
        </View>
        <View style={styles.innerView}>
          <Picker 
            collection={genders} 
            selectedValue={this.state.settings.gender}
            show={this.state.showPicker}
            onValueChange={(itemValue, itemIndex) => this.setState({ settings: { ...this.state.settings, gender: itemValue } })}
            />
        </View>
        <View style={[styles.innerView, styles.row]}>
          <View style={styles.col2}>
            <TextInput 
              style={[styles.fullWidth, styles.regularFont]} 
              onChangeText={(v) => this.setState({ settings: { ...this.state.settings, height: parseInt(v) } } )} 
              placeholder="Height (cm)"/> 
          </View>
          <View style={styles.col2}>
            <TextInput 
              style={[styles.fullWidth, styles.regularFont]} 
              onChangeText={(v) => this.setState({ settings: { ...this.state.settings, age: parseInt(v) } } )} 
              placeholder="Age (years)"/> 
          </View>
        </View>
        <View style={[styles.innerView, styles.row, { marginTop: 20 }]}>
          <ColoredButton title='Save settings' onPress={this._save} styles={[styles.fullWidth, styles.positive]} /> 
        </View>
      </View>
    );
  }
}