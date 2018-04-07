import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * The page to enter weight measurements
 */
export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Enter measurements',
    headerStyle: GlobalStyles.primaryBackground,
    headerTintColor: '#fff'
  }

  constructor(props) {
    super(props);
    this.state = {};

    this._loadSettings();
  }

  _loadSettings = async () => {
    const settings = await AsyncStorage.getItem(Globals.SETTINGS_KEY);
    
    this.setState({
      settings: JSON.parse(settings)
    });   
  }

  render() {
    return(
      <SafeAreaView style={styles.view}>
        <Text>Enter weight stuff here</Text>
      </SafeAreaView>
    );
  }
}