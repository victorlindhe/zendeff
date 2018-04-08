import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import Settings from 'zendeff/components/settings';
import Today from 'zendeff/components/today';

/*
 * Application entry point.
 */
const AppStack = TabNavigator({ 
  Today: StackNavigator({ Today: Today }), 
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