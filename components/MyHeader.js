import  React, {Component} from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {View, Text, StyleSheet, Alert} from 'react-native';
import db from '../config';

export default class MyHeader extends Component{
constructor(props){
    super(props);
    this.state={
       value:'',
    }
}
getNumberOfUnreadNotifications(){
    db.collections("all_notifications").where('notification_status', '==', 'unread')
    .onSnapshot((snapshot)=>{
       var unreadNotifications=snapshot.docs.map((doc)=>{
           doc.data();
       })
       this.setState({
           value:unreadNotifications.length(),
       })
    })
}
componentDidMount(){
    this.getNumberOfUnreadNotifications();
}
bellIconWithBadge=()=>{
    return(
        <View>
            <Icon name='bell' type='font-awesome' color='#696969' size={25} onPress={()=>{this.props.navigation.navigate('Notification')}}></Icon>
            <Badge value={this.state.value} containerStyle={{position:'absolute', top:-4, right:-4}}></Badge>
        </View>
    )
}
render(){
    return(
    <Header leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPresss={()=>{this.props.navigation.toggleDrawer()}}></Icon>} centerComponent={{text:this.props.title, style:{color:'#90a5a9', fontSize:20, fontWeight:'bold'}}} rightComponent={<this.bellIconWithBadge{...this.props}/>} backgroundColor='#eaf8fe'></Header>
    )
}
}
