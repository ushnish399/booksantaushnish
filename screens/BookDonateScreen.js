import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component{
    constructor(){
        super();
        this.state={
            requestedBooksList:[],

        }
        this.requestRef=null;
    }
    getRequestedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data())
            this.setState({requestedBooksList:requestedBooksList})
        })
    }
    componentDidMount(){
        this.getRequestedBooksList();
    }
    componentWillUnmount(){
        this.requestRef();
    }
    keyExtractor=(item, index)=>{index.toString()}
    renderItem=({item, i})=>{
        return(
            <ListItem key={i} title={item.book_name} subTitle={item.reason_to_request} style={{color:'black', fontWeight:'bold'}} rightElement={<TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('ReceiverDetails', {'details':item})}}><Text style={{color:'#ffff'}}>view</Text></TouchableOpacity>} bottomDivider></ListItem>
        )
    }

render(){
    return(
        <View style={{flex:1}}>
            <MyHeader title="DONATE BOOKS"></MyHeader>
            <View style={{fle:1}}>
                {
                    this.state.requestedBooksList.length===0 ? (<View style={styles.subContainer}><Text style={{fontSize:20}}>LIST OF ALL REQUESTED BOOKS</Text></View>) : (<FlatList keyExtractor={this.keyExtractor} data={this.state.requestedBooksList} renderItem={this.renderitem}></FlatList>)
                }
            </View>
        </View>
    )
}

}


const styles=StyleSheet.create({
 subContainer:{flex:1, fontSize:20, justifyContent:'center', alignItems:'center'},
 button:{width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:'#ff5722', shadowColor:'#000', shadowOffset:{width:0, height:8}},
})