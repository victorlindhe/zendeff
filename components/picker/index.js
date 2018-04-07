import React from 'react';
import { Picker, Text, View } from 'react-native';

/*
 * Generic picker
 */
export default class MyPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.show) {
      return(
        <Picker
          selectedValue={this.props.selectedValue}
          style={{height: 200}}
          onValueChange={this.props.onValueChange}>
          {this.props.collection.map((i) => {
            return <Picker.Item value={i.value} label={i.label} key={i.value} />
          })}
        </Picker>
      );
    } else {
      return null
    }
  }
};