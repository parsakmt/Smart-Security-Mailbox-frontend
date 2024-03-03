/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async () => {});


// When running on device (via expo), this needs to change to "main"
AppRegistry.registerComponent(appName, () => App);
