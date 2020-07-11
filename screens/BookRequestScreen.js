import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class BookRequestScreen extends Component{

constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        bookName:'',
        reasonToRequest:'',
    }
}

createUniqueId(){
    return Math.random().toString(36).subString(7);
}
addRequest=(bookName, reasonToRequest)=>{
    var userId=this.state.userId
    var randomRequestId=this.createUniqueId();
    db.collection('requested_books').add({
        "user_id":userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id":randomRequestId,
    })
    this.setState({bookName:'', reasonToRequest:''})
    return(
        Alert.alert("BOOK REQUESTED SUCCESFULLY")
    )
}

render(){
    return(
        <View style={{flex:1}}>
            <MyHeader title="REQUEST BOOK"></MyHeader>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput style={styles.formTextInput} placeholder='ENTER BOOK NAME' value={this.state.bookName}  onChangeText={(text)=>{this.setState({bookName:text})}}></TextInput>
            <TextInput style={[styles.formTextInput, {height:300}]} placeholder='DESCRIBE THE BOOK YOU WANT' multiline numberOfLines={8}  value={this.state.reasonToRequest} onChangeText={(text)=>{this.setState({reasonToRequest:text})}}></TextInput>
            <TouchableOpacity style={styles.button} onPress={()=>{this.addRequest(this.state.bookName, this.state.resaonToRequest)}}>
                <Text>REQUEST</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

}
const styles=StyleSheet.create({
keyBoardStyle:{flex:1, alignItems:'center', justifyContent:'center'},
formTextInput:{width:'75%', height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10},
button:{width:'75%', height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:'#ff5723', shadowColor:'#000', shadowOffset:{width:0, height:8}, shadowOpacity:0.3, shadowRadius:10.3, elevation:16, marginTop:20},

})