import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
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
      showPicker: false
    };

    this._showPicker = this._showPicker.bind(this);
    this._save = this._save.bind(this);

    this._loadSettings();
  }

  _showPicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  _save = async () => {
    console.log(this.state.settings);
    await AsyncStorage.setItem(Globals.SETTINGS_KEY, JSON.stringify(this.state.settings));
  }

  _loadSettings = async () => {
    const settings = await AsyncStorage.getItem(Globals.SETTINGS_KEY);
    const settingsParsed = JSON.parse(settings);

    if(settingsParsed && this.props.navigation.state.params && this.props.navigation.state.params.initial) {
      this.props.navigation.navigate('App')
    } else {
      this.setState({
        settings: settingsParsed || Globals.DEFAULT_SETTINGS
      });
    }    
  }

  render() {
    const genders = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    if(!this.state.settings) return null

    return(
      <SafeAreaView style={styles.view}>
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
              value={this.state.settings.height ? this.state.settings.height.toString() : ''}
              placeholder="Height (cm)"/> 
          </View>
          <View style={styles.col2}>
            <TextInput 
              style={[styles.fullWidth, styles.regularFont]}
              value={this.state.settings.age ? this.state.settings.age.toString() : ''} 
              onChangeText={(v) => this.setState({ settings: { ...this.state.settings, age: parseInt(v) } } )} 
              placeholder="Age (years)"/> 
          </View>
        </View>
        <View style={[styles.innerView, styles.row, { marginTop: 20 }]}>
          <ColoredButton title='Save settings' onPress={this._save} styles={[styles.fullWidth, styles.positive]} /> 
        </View>
      </SafeAreaView>
    );
  }
}