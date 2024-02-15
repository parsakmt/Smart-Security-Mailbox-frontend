/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth0, Auth0Provider} from 'react-native-auth0';

import Login from './src/views/Login';
import Setup from './src/views/Setup';
import Navigator from './src/navigators/Navigator';

import {AUTH_DOMAIN, AUTH_CLIENT_ID} from '@env';

const Stack = createNativeStackNavigator();


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Auth0Provider domain={AUTH_DOMAIN} clientId={AUTH_CLIENT_ID}>
        <Stack.Navigator>
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerBackVisible: false}}
          />
          <Stack.Screen
            name={'Setup'}
            component={Setup}
            options={{headerBackVisible: false}}
          />
          <Stack.Screen
            name={'Application'}
            component={Navigator}
            options={{headerBackVisible: false}}
          />
        </Stack.Navigator>
      </Auth0Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
});

export default App;
