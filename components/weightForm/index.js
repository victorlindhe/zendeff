import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage, SafeAreaView } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import ColoredButton from 'zendeff/components/coloredButton';

const styles = StyleSheet.create(GlobalStyles);

/*
 * The page to enter weight measurements
 */
export default class WeightForm extends React.Component {
  static navigationOptions = {
    title: 'Weight',
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
      <SafeAreaView style={[styles.view, styles.centered]}>
        <View style={[styles.innerView, styles.centered]}>
          <TextInput
            placeholder="Weight (kg)"
            style={[styles.superBigFont, styles.centeredText, styles.width70]}
          />
          <TextInput
            placeholder="Navel (cm)"
            style={[styles.superBigFont, styles.centeredText, styles.width70, styles.marginTop]}
          />
          <ColoredButton 
            title="Save" 
            onPress={() => {}}
            styles={[styles.positive, styles.width70, styles.marginTop]} 
          />
        </View>
      </SafeAreaView>
    );
  }
}