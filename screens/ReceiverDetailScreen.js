import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity} from 'react-native';
import {ListItem, Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetailsScreen extends Component{
    constructor(props){
      super(props);
      this.state={
          userId:firebase.auth().currentUser.email,
          receiverId:this.props.navigation.getParam('details')['user_id'],
          requestId:this.props.navigation.getParam('details')['request_id'],
          bookName:this.props.navigation.getParam('details')['book_name'],
          reason_for_requesting:this.props.navigation.getParam('details')['reason_to_request'],
          receiverNmae:'',
          receiverContact:'',
          receiverAddress:'',
          receiverRequestdocId:'',
          userName:'',
      }
    }

    getReceiverDetails(){
        db.collection("users").where('email_id', '==', this.state.recieverId).get()
        .then((snapshot)=>{
          snapshot.forEach(doc=>{
              this.setState({
                  receiverName:doc.data().first_name,
                  recieverContact:doc.data().contact,
                  recieverAddress:doc.data().address,

              })
          })
        })
        db.collection("requested_books").where('request_id', '==', this.state.requestId).get()
        .then((snapshot)=>{
          snapshot.forEach(doc=>{
              this.setState({
                  receiverRequestdocId:doc.id,
              })
          })
        })
    }

    updateBookStatus=()=>{
        db.collection("all_donations").add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.receiverName,
            donor_id:this.state.userId,
            request_status:'donor interested',
        })
    }

    componentDidMount(){
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
    }
    addNotification=()=>{
        var message=this.state.userName + 'has shown interest in donating the book'
        db.collection("all_notifications").add({
            targeted_user_id:this.state.receiverId,
            donor_id:this.state.userId,
            request_id:this.state.requestId,
            book_name:this.state.bookName,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            notification_status:'unread',
            message:message,
        })
    }
    getUserDetails=(userId)=>{
  db.collection("users").where('email_id', "==", userId).get()
  .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
            userName:doc.data().first_name + ' ' + doc.data().last_name
        })
      }
      )
  })
    }

    render(){
        return(
            <View style={styles.container}>
                <View styles={{flex:0.1}}>
                    <Header leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={()=>{this.props.navigation.goBack()}}></Icon>}
                    centerComponent={{text:'DONATE BOOKS', style:{color:'#90a5a9', fontSize:20, fontWeight:'bold'}}}
                    backgroundColor='#eaf8f8'></Header>
                </View>
                <View  style={{flex:0.3}}>
                  <Card title={'BOOK INFORMATION'} titleStyle={{fontSize:20}}>
                      <Card>
                          <Text style={{fontWeight:'bold'}}>name:{this.state.bookName}</Text>
                      </Card>
                      <Card>
                          <Text style={{fontWeight:'bold'}}>reason:{this.state.reason_for_requesting}</Text>
                      </Card>
                  </Card>
                </View>
                <View style={{flex:0.3}}>
                <Card title={'RECEIVER INFORMATION'} titleStyle={{fontSize:20}}>
                      <Card>
                          <Text style={{fontWeight:'bold'}}>name:{this.state.receiverName}</Text>
                      </Card>
                      <Card>
                          <Text style={{fontWeight:'bold'}}>contact:{this.state.receiverContact}</Text>
                      </Card>
                      <Card>
                          <Text style={{fontWeight:'bold'}}>address:{this.state.receiverAddress}</Text>
                      </Card>
                  </Card>
                </View>
                <View style={{flex:0.3, justifyContent:'center', alignItems:'center'}}>
                    {
                        this.state.receiverId!=this.state.userId ? (
                            <TouchableOpacity style={styles.button} onPress={()=>{this.updateBookStatus()
                                this.addNotification()
                            this.props.navigation.navigate('MyDonations')}}>
                                <Text>I WANT TO DONATE</Text>
                            </TouchableOpacity>
                        ) : null
                    }
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{flex:1},
    button:{width:200, height:50, justifyContent:'center', aligniTems:'center', borderRadius:10, backgroundColor:'orange', shadowColor:'#000', shadowOffset:{width:0, height:8}, elevation:16},
})


