import React, {Component} from 'react';
import {View, StyleSheet, Text, Flatlist, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomsideBarMenu extends Component{

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.container}>
                   <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton} onPress={()=>{this.props.navigation.navigate('WelcomeScreen')
                 firebase.auth().signOut()}}>
                     <Text style={styles.logOutText}>LOG OUT</Text>
                        
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
container:{flex:0.8},
logOutContainer:{flex:0.2, justifyContent:'flex-end', paddingBottom:30},
logOutButton:{height:30, width:'100%', justifyContent:'center', padding:10},
logOutText:{fontSize:30, fontWeight:'bold'}
})