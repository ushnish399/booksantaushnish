import  React, {Component} from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {View, Text, StyleSheet, Alert} from 'react-native';

const MyHeader=props=>{
    return(
        <Header backgroundColor='#eaf8fe' centerComponent={{text:props.title, style:{color:'#90afa9', fontSize:20, fontWeight:'bold'}}}></Header>

    )
}
export default MyHeader