import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from '../views/History';

function HistoryNavigator({navigation, uid}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="SmartSecurityMailbox"
        children={() => <HistoryScreen uid={uid} navigation={navigation} />}
      />
    </HomeStack.Navigator>
  );
}

export default HistoryNavigator;
