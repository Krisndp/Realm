/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import TodoListComponent from './component/TodoListComponent'
import {name as appName} from './app.json';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => TodoListComponent);
