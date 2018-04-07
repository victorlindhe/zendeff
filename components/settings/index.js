import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
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
    this.state = Globals.DEFAULT_SETTINGS;

    this._showPicker = this._showPicker.bind(this);
  }

  _showPicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  render() {
    const genders = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    return(
      <View style={styles.view}>
        <View style={styles.innerView}>
          <Text style={styles.regularFont}>Selected gender is {this.state.gender}</Text>
          <ColoredButton title={this.state.showPicker ? 'Finish' : 'Edit'} onPress={this._showPicker} styles={[styles.flexEnd]} /> 
        </View>
        <View style={{width: '90%'}}>
          <Picker 
            collection={genders} 
            selectedValue={this.state.gender}
            show={this.state.showPicker}
            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
            />
        </View>
      </View>
    );
  }
}