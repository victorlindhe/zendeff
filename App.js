import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import Settings from 'zendeff/components/settings';
import Today from 'zendeff/components/today';
import History from 'zendeff/components/history';
import AddEntry from 'zendeff/components/addEntry';

/*
 * Application entry point.
 */
const AppStack = TabNavigator({ 
  Today: StackNavigator({ Today: Today }), 
  History: StackNavigator({ History: History, AddEntry: AddEntry }),
  Settings: StackNavigator({ Settings: Settings })
});

export default SwitchNavigator(
  {
    SettingStack: Settings,
    App: AppStack
  },
  {
    initialRouteName: 'SettingStack',
    initialRouteParams: {
      initial: true
    }
  }
);