import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GlobalStyles from 'zendeff/config/styles.js';

const styles = StyleSheet.create(GlobalStyles);

/*
 * A colored button
 */
export default class ColoredButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={[styles.secondaryBackground, this.props.styles]}>
        <Button
          title={this.props.title}
          color='#fff'
          onPress={this.props.onPress}
          />
      </View>
    );
  }
};