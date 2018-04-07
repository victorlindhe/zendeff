import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';

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
  }

  render() {
    return(
      <View style={styles.view}>
        <Text>Settings page</Text>
      </View>
    );
  }
}