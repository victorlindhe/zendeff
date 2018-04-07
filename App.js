import React from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from 'zendeff/components/settings';
import WeightForm from 'zendeff/components/weightForm';

/*
 * Application entry point. Checks for settings. If none set, then redirect to settings page.
 */
const RootStack = StackNavigator(
  {
    Settings: {
      screen: Settings
    },
    WeightForm: {
      screen: WeightForm
    }
  },
  {
    initialRouteName: 'Settings',
    initialRouteParams: {
      initial: true
    }
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