import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity} from 'react-native';
import {ListItem, Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyDonationScreen extends Component{
    constructor(){
        super();
        this.state={
            donorId:firebase.auth().currentUser.email,
            donorName:'',
            allDonations:[],
        }
        this.requestRef=null;
    }
    static navigationOptions={header:null}
    getDonorDetails=(donorId)=>{
        db.collections("users").where("email_id", "==", donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({donorName:doc.data().first_name + " " + doc.data().last_name})
            })
        })
    }
    getAllDonations=()=>{
        this.requestRef=db.collections("all_donations").where("donor_id", "==", this.state.donorId)
        .onSnapshot((snapshot)=>{
            var allDonations=[];
            snapshot.docs.map((doc)=>{
                var donations=doc.data()
                donations["doc_id"]=doc.doc_id
                allDonations.push(donation);
            })
            this.setState({
                allDonations:allDonations,
            })
        })
    }
    sendBook=(bookDetails)=>{
       if(bookDetails.request_status==='book sent'){
           var requestStatus='donor interested'
           db.collection("all_donations").doc(bookDetails.doc_id).update({
               request_status:'donor interested',
           })
           this.sendNotification(bookDetails, requestStatus)
           
       }
       else{
           var requestStatus='book sent'
           db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status:'book sent',
            
        })
        this.sendNotification(bookDetails,  requestStatus)
       }
    }
    sendNotification=(bookDetails, requestStatus)=>{
         var requestId=bookDetails.request_id;
         var donorId=bookDetails.donor_id;
         db.collection("all_notifications").where("request_id", "==", requestId).where("donor_id", "==", donorId).get()
         .then((snapshot)=>{
             snapshot.forEach((doc)=>{
                 var message='';
                 if(requestStatus=='book sent'){
                     message=this.state.donorName + 'sent you a book'
                 }
                 else{
                     message=this.state.donorName + 'has shown interest in donating the book'
                 }
                 db.collection("all_notifications").doc(doc.id).update({
                     message:message,
                     notification_status:'unread',
                     date:firebase.firestore.FieldValue.serverTimestamp(),
                 })
             })
         })
    }
    keyExtractor=(item, index)=>{
        index.toString();
    }
    renderItem=({item, i})=>{
    <ListItem key={i} title={item.book_name} subTitle={'requested by:'+ item.requested_by + '\n status' + item.request_status} leftElement={<Icon name='book' type='font-awesome' color='#696969'></Icon>} titleStyle={{color:'black', fontWeight:'bold'}} rightElement={<TouchableOpacity style={[styles.button, {backgroundColor:item.request_status==='book sent' ? 'green' : '#ff5722'}]} onPress={()=>{this.sendBook(item)}}><Text style={{color:'#ffff'}}>{item.request_status==='book sent' ? 'book sent' : 'send book'}</Text></TouchableOpacity>} bottomDivider></ListItem>
    }
    componentDidMount(){
        this.getDonorDetails(this.state.donorId);
        this.getAllDonations();
    }
    componentWillUnmount(){
        this.requestRef();
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation} title='MY DONATIONS '></MyHeader>
                <View style={{flex:1}}>
                    {this.state.allDonations.length===0 ? (<View style={{flex:1, fontSize:20, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:20}}>LIST OF ALL BOOK DONATIONS</Text></View>) : (<Flatlist keyExtractor={this.keyExtractor} data={this.state.allDonations} renderItem={this.renderItem}></Flatlist>)}
                </View>
            </View>
        )
    }
}
const styles=StylesSheet.create({
    button:{width:200, height:50, justifyContent:'center', aligniTems:'center', borderRadius:10, backgroundColor:'orange', shadowColor:'#000', shadowOffset:{width:0, height:8}, elevation:16},
})