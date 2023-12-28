
//https://github.com/expo/expo/issues/23104
//import @expo/metro-runtime to fix fast refres in web when using bundler metro
import "@expo/metro-runtime"

import registerRootComponent from 'expo/build/launch/registerRootComponent'

import App from './src/apps/NavigationApp'

registerRootComponent(App)


// const modules = require.getModules()
// const moduleIds = Object.keys(modules)
// const loadedModuleNames = moduleIds
//     .filter(moduleId => modules[moduleId].isInitialized)
//     .map(moduleId => modules[moduleId].verboseName)
// const waitingModuleNames = moduleIds
//     .filter(moduleId => !modules[moduleId].isInitialized)
//     .map(moduleId => modules[moduleId].verboseName)

// // make sure that the modules you expect to be waiting are actually waiting
// console.log(
//     'loaded:',
//     loadedModuleNames.length,
//     'waiting:',
//     waitingModuleNames.length,
// )

// // grab this text blob, and put it in a file named packager/modulePaths.js
// console.log(
//     `module.exports = ${JSON.stringify(
//         loadedModuleNames.sort(),
//         null,
//         2,
//     )};`,
// )

// const isHermes = () => !!global.HermesInternal;
// console.log("isHermes", isHermes())