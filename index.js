/**
 * @format
 */

import {
    AppRegistry,
    LogBox,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// As of victory@36.4.0, React Native apps (on both iOS and Android) will warn about require cycles.
// These warnings will not affect the functionality of victory-native or your app, and can be safely disabled.
LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
  ]);

AppRegistry.registerComponent(appName, () => App);
