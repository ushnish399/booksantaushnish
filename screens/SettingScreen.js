import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:'',
        }
    }
    getUserDetails=()=>{
        var email=firebase.auth().currentUser.email
        db.collection("users").where('email_id', '==', email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id,
                })
            })
        })
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId)
        .update({
            'first_name':this.state.firstName,
            'last_name':this.state.lastName,
            'address':this.state.address,
            'contact':this.state.contact,
        })
        Alert.alert("PROFILE UPDATED SUCCESFULLY")
    }
    componentDidMount(){
        this.getUserDetails();
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="SETTINGS" navigation={this.props.navigation}></MyHeader>
                <View style={styles.formContainer}>
                       <TextInput style={styles.formTextInput} placeholder='FIRST NAME' maxLength={8} onChangeText={(text)=>{this.setState({firstName:text})}} value={this.state.firstName}></TextInput>
                       <TextInput style={styles.formTextInput} placeholder='LAST NAME' maxLength={8} onChangeText={(text)=>{this.setState({lastName:text})}} value={this.state.lastName}></TextInput>
                       <TextInput style={styles.formTextInput} placeholder='CONTACT' maxLength={10} onChangeText={(text)=>{this.setState({contact:text})}} keyBoardType={'numeric'} value={this.state.contact}></TextInput>
                       <TextInput style={styles.formTextInput} placeholder='ADDRESS' multiline={true} onChangeText={(text)=>{this.setState({address:text})}} value={this.state.address}></TextInput>
                       <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails}}>
                           <Text style={styles.buttonText}>SAVE</Text>
                       </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{flex:1, alignItems:'center', justifyContent:'center'},
    formContainer:{flex:1, alignItems:'center', width:'100%'},
    formTextInput:{width:'75%', height:35, alignSelf:'center', borderColor:'black', borderRadius:10, borderWidth:1, marginTop:20, padding:10},
    button:{width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:'green', shadowColor:'#000', shadowOffset:{width:0, height:8}, shadowOpacity:0.3, shadowRadius:10.3, elevation:16},
    buttonText:{color:'white', fontWeight:'200', fontSize:20},
})