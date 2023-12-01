/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {House, ClockCounterClockwise} from 'phosphor-react-native';

import HomeNavigator from './src/navigators/HomeNavigator';
import HistoryNavigator from './src/navigators/HistoryNavigator';

// For testing BLE
import Lock from './src/views/Lock';

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4DA8E5',
          headerShown: false,
        }}>
        <Tab.Screen name="Lock" component={Lock} />
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => <House color={color} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryNavigator}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => <ClockCounterClockwise color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
