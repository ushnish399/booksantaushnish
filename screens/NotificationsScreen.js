import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { FlatList } from 'react-native-gesture-handler';

export default class NotificationsScreen extends Component{

    constructor(props){
    super(props);
    this.state={
        userId:firebase.auth().currentUser.email,
        allNotifications:[],

   }
   this.notificationRef=null;
}
getNotifications=()=>{
    this.notificationRef=db.collection("all_notifications").where('notification_status', '==', 'unread').where('targeted_user_id', '==', this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications=[];
      snapshot.docs.map((doc)=>{
        var notifications=doc.data();
        notifications['doc_id']=doc.id
        allNotifications.push(notifications)
      })
      this.setState({
          allNotifications:allNotifications,
      })
    }) 
}
componentDidMount(){
    this.getNotifications();
}
componentWilUnmount(){
    this.notificationRef();
}
keyExtractor=(item, index)=>{
index.toString();
}
renderItem=({item, index})=>{
   return(
   <ListItem key={index} leftElement={<Icon name={"book"} type={'font-awesome'} color={'#696969'}></Icon>} title={item.book_name} titleStyle={{color:'black', fontWeight:'bold'}} subtitle={item.message} bottomDivider></ListItem>
   ) 
}
render(){
    return(
        <View style={{flex:1}}>
            <View style={{flex:0.1}}>
                <MyHeader title='notifications' navigation={this.props.navigation}></MyHeader>
            </View>
            <View style={{flex:0.9}}>
                {this.state.allNotifications.lemgth===0 ? (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:25}}>you have no notification</Text></View>) : (<FlatList keyExtractor={this.keyExtractor} data={this.state.allNotifications} renderItem={this.renderItem}></FlatList>)}
            </View>
        </View>
    )
}

}