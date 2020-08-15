import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import ReceiverDetailScreen from '../screens/ReceiverDetailScreen';

export const AppStackNavigator=createStackNavigator({
    BookDonateList:{screen:BookDonateScreen, navigationOptions:{headerShown:false}},
    ReceiverDetails:{screen:ReceiverDetailScreen, navigationOptions:{headerShown:false}},
}, 
{
    initialRouteName:'BookDonateList',
}
)


