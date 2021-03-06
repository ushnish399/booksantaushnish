import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppTabNavigator} from './components/TabNavigator';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawNavigator} from './components/AppDrawNavigator';

export default function App() {
  return (
   <AppContainer></AppContainer>
  );
}

const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{
    screen:WelcomeScreen,
  },
  Drawer:{
    screen:AppDrawNavigator
  }
})
const AppContainer=createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
