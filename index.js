/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './Src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
