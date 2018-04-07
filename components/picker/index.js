import React from 'react';
import { Picker } from 'react-native';

export default class MyPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Picker
        selectedValue={this.props.selectedValue}
        style={{height: 50}}
        onValueChange={this.props.onValueChange}>
        {this.props.collection.map((i) => {
          return <Picker.Item value={i.value} label={i.label} key={i.value} />
        })}
      </Picker>
    );
  }
};