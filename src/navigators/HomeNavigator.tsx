import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/Home';
import Header from '../components/Header';

function HomeNavigator({firstName, macAddress, navigation}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="SmartSecurityMailbox"
        children={() => (
          <HomeScreen firstName={firstName} macAddress={macAddress} navigation={navigation} />
        )}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
