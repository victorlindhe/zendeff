import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';
import Globals from 'zendeff/config/globals.js';
import Picker from 'zendeff/components/picker';

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
  }

  render() {
    const genders = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    return(
      <View style={styles.view}>
        <View style={styles.innerView}>
          <Picker 
            collection={genders} 
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
            />
        </View>
      </View>
    );
  }
}