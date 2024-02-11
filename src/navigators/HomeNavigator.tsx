import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/Home';
import Header from '../components/Header';

function HomeNavigator({firstName, navigation}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}>
      <HomeStack.Screen
        name="SmartSecurityMailbox"
        children={() => (
          <HomeScreen firstName={firstName} navigation={navigation} />
        )}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
