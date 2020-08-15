import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './TabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/BookDonateScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const AppDrawNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Setting:{screen:SettingScreen},
    Notification:{screen:NotificationsScreen},
    MyDonations:{screen:MyDonationScreen},
}, 

{contentComponent:CustomSideBarMenu}, 
{initialRouteName:'Home'})