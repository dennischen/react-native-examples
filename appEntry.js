
//https://github.com/expo/expo/issues/23104
//import @expo/metro-runtime to fix fast refres in web when using bundler metro
import "@expo/metro-runtime";

import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from './src/apps/NavigationApp';

registerRootComponent(App);
