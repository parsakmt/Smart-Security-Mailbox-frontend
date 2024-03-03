import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/Home';

function HomeNavigator({firstName, macAddress, navigation, uid}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="SmartSecurityMailbox"
        children={() => (
          <HomeScreen
            firstName={firstName}
            macAddress={macAddress}
            navigation={navigation}
            uid={uid}
          />
        )}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
