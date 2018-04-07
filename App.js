import React from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from 'zendeff/components/settings'

/*
 * Application entry point. Checks for settings. If none set, then redirect to settings page.
 */
const RootStack = StackNavigator(
  {
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: 'Settings'
  }
);

/*
 * App with RootStack element
 */
export default class App extends React.Component {
  render() {
    return <RootStack />
  }
};