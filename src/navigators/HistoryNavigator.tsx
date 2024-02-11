import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from '../views/History';
import Header from '../components/Header';

function HistoryNavigator({uid}): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}>
      <HomeStack.Screen name="SmartSecurityMailbox"
      children={() => (
                <HistoryScreen uid={uid}/>
              )}
              />
    </HomeStack.Navigator>
  );
}

export default HistoryNavigator;
