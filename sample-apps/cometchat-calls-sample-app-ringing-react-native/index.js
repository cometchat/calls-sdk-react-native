/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { registerBackgroundCallTask } from '@cometchat/push-notifications-voip-react-native';
import App from './App';
import { name as appName } from './app.json';
// Imported for its side effect: subscribes to the call events before anything else is awaited.
import './src/calls/push';

// At module scope, so a fully killed Android app can send a decline. Without it the caller keeps
// ringing until the timeout.
registerBackgroundCallTask();

AppRegistry.registerComponent(appName, () => App);
