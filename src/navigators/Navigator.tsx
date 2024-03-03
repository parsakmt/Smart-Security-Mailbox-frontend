import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {House, ClockCounterClockwise} from 'phosphor-react-native';

import HomeNavigator from '../navigators/HomeNavigator';
import HistoryNavigator from '../navigators/HistoryNavigator';

import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
  notifee.displayNotification({
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
});

const Navigator = ({navigation, route}) => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    return messaging().onMessage(async remoteMessage => {
      console.log('Foreground message: ', remoteMessage);
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
      notifee.displayNotification({
        title: remoteMessage.data.title,
        body: remoteMessage.data.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4DA8E5',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeNavigator
            firstName={route.params.firstName}
            macAddress={route.params.macAddress}
            uid={route.params.uid}
            navigation={navigation}
          />
        )}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <House color={color} />,
        }}
      />
      <Tab.Screen
        name="History"
        children={() => (
          <HistoryNavigator
            firstName={route.params.firstName}
            macAddress={route.params.macAddress}
            uid={route.params.uid}
            navigation={navigation}
          />
        )}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => <ClockCounterClockwise color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
