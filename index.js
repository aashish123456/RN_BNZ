/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Index from './src/scenes/Index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Index);
