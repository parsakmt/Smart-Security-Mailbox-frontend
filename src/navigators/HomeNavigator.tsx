import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/Home';
import Header from '../components/Header';


function HomeNavigator(): JSX.Element {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => <Header/>,
      }}>
      <HomeStack.Screen name="SmartSecurityMailbox" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
