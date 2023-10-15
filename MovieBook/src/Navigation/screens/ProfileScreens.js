import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';

export default function ProfileScreen() {
    const User = getAuth().currentUser
    
    // const [newName, setNemName] = useState('')
    // function changeName(){
    //     updateProfile(User, {displayName: newName})
    // }
    
    return (
    <SafeAreaView  style={{flex: 1}}>
        <ScrollView
        style={Styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        >
        {/* <View style={Styles.profileContainer}> */}
        <Text style={Styles.userUid}>UID: {User.uid ? User.uid : 'undefined'}</Text>
            <View style={Styles.imgContainer}>
                {/* UID */}
                <Image style={Styles.userImg} source={User.photoURL != null ? User.photoURL : require('../../assets/no-profile-picture.png')}/>
                    <View style={Styles.textContainer}>
                        {/* Name */}
                        <View style={Styles.userNameContainer}>
                            <Text style={Styles.prefix}>Name:</Text>
                            <Text style={Styles.userName}>{User.displayName ? User.displayName : 'no name'}</Text>
                        </View>
                        {/* Phone */}
                        <View style={Styles.userPhoneContainer}>
                            <Text style={Styles.prefix}>Phone number:</Text>
                            <Text style={Styles.userPhone}>{User.phoneNumber ? User.phoneNumber : 'no phone'}</Text>
                        </View>
                        {/* Email */}
                        <View style={Styles.userMailContainer}>
                            <Text style={Styles.prefix}>Email:</Text>
                            <Text style={Styles.userEmail}>{User.email}</Text>
                        </View>
                    </View>
            </View>
        {/* </View> */}

        </ScrollView>
    </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
container: {
        flex: 1,
        padding: 10,
},
profileContainer: {
    width: '100%',
},

userUid:{
    color: '#bababa',
    // marginVertical: 10,
},

imgContainer:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#d4cfcf',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
},

textContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
},

userImg: {
    margin: 10,
    height: 120,
    width: 120,
    borderRadius: 75,
},

//Profile User name container
userNameContainer:{
    height: '30%',
    width: '100%',
},
userName:{
    marginLeft: 20,
    fontSize: 16,
},

//Profile User phone container
userPhoneContainer:{
    height: '30%',
    width: '100%',
},
userPhone:{
    marginLeft: 20,
    fontSize: 16,
},

//Profile User mail container
userMailContainer:{
    height: '30%',
    width: '100%',
},
userEmail:{
    marginLeft: 20,
    fontSize: 16,
},

prefix:{
    fontWeight: 'bold'
},

})