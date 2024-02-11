import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {House, ClockCounterClockwise} from 'phosphor-react-native';

import HomeNavigator from '../navigators/HomeNavigator';
import HistoryNavigator from '../navigators/HistoryNavigator';

const Navigator = ({navigation, route}) => {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4DA8E5',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          children={()=><HomeNavigator firstName={route.params.firstName} navigation={navigation}/>}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => <House color={color} />,
          }}
        />
        <Tab.Screen
          name="History"
          children={()=><HistoryNavigator uid={route.params.uid} navigation={navigation}/>}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => <ClockCounterClockwise color={color} />,
          }}
        />
      </Tab.Navigator>
  );
};

export default Navigator;