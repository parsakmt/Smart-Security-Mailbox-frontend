import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/Home';
import Header from '../components/Header';

function HomeNavigator({firstName, navigation, uid}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="SmartSecurityMailbox"
        children={() => (
          <HomeScreen firstName={firstName} uid={uid} navigation={navigation} />
        )}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
