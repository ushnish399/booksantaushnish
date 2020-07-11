import * as React from 'react'
import {Image} from 'react-native';
import {CreateBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{
        screen:BookDonateScreen, 
        navigationOptions: {
            tabBarIcon:<Image source={require("../assets/request-list.png")} style={{width:20, height:20}}></Image>,
            tabBarLabel:"donate books"
        }
    },
    RequestBooks:{
        screen:BookRequestScreen, 
        navigationOptions: {
            tabBarIcon:<Image source={require("../assets/request-book.png")} style={{width:20, height:20}}></Image>,
            tabBarLabel:"request books"
        }
    },

})