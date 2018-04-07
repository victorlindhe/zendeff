import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import Settings from 'zendeff/components/settings';
import WeightForm from 'zendeff/components/weightForm';

/*
 * Application entry point.
 */
const AppStack = TabNavigator({ 
  WeightForm: StackNavigator({ WeightForm: WeightForm }), 
  Settings: StackNavigator({ Settings: Settings })
});

export default SwitchNavigator(
  {
    Settings: Settings,
    App: AppStack
  },
  {
    initialRouteName: 'Settings',
    initialRouteParams: {
      initial: true
    }
  }
);