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
    let viewStyles = [styles.secondaryBackground, this.props.styles];

    return(
      <View style={viewStyles}>
        <Button
          title={this.props.title}
          color='#fff'
          onPress={this.props.onPress}
          disbaled={this.props.disabled}
          />
      </View>
    );
  }
};