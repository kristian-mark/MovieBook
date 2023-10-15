import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase'
import IonIcons from 'react-native-vector-icons/Ionicons'

export default function ProfileScreen() {
    const User = getAuth().currentUser
    
    const [newName, setNemName] = useState(User.displayName)
    function ChangeName(){
        updateProfile(User, {displayName: newName})
    }
    
    return (
    <SafeAreaView  style={{flex: 1}}>
        <ScrollView
        style={Styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        >
        {/* UID */}
        <Text style={Styles.userUid}>UID: {User.uid ? User.uid : 'undefined'}</Text>
            <View style={Styles.imgContainer}>
                <Image style={Styles.userImg} source={User.photoURL != null ? User.photoURL : require('../../assets/no-profile-picture.png')}/>
                    <View style={Styles.textContainer}>
                        {/* Name */}
                        <View style={Styles.userNameContainer}>
                            <Text style={Styles.desctirtion}>Name:</Text>
                            <Text style={Styles.userInput}>{User.displayName ? User.displayName : 'no name'}</Text>
                        </View>
                        {/* Phone */}
                        <View style={Styles.userPhoneContainer}>
                            <Text style={Styles.desctirtion}>Phone number:</Text>
                            <Text style={Styles.userInput}>{User.phoneNumber ? User.phoneNumber : 'no phone'}</Text>
                        </View>
                        {/* Email */}
                        <View style={Styles.userMailContainer}>
                            <Text style={Styles.desctirtion}>Email:</Text>
                            <Text style={Styles.userInput}>{User.email}</Text>
                        </View>
                    </View>
            </View>

            {/* Settings View */}
            <View style={Styles.settingsWrap}>
                {/* Chenge name */}
                <TouchableOpacity onPress={() => {ChangeName}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Change name</Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>

                {/* Chenge phone */}
                <TouchableOpacity onPress={() => {}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Change phone</Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>

                {/* Chenge profile picture */}
                <TouchableOpacity onPress={() => {}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Change profile picture</Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>

                {/* Log out */}
                <TouchableOpacity onPress={() => {FIREBASE_AUTH.signOut()}} style={Styles.buttonContent}>
                        <Text style={Styles.logOutButton}>Log Out</Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>
            </View>

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
},

imgContainer:{
    height: 130,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#C9D9C3',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
},

textContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
},

userImg: {
    margin: 10,
    height: 110,
    width: 110,
    borderRadius: 75,
},

//
userNameContainer:{
    height: '30%',
    width: '100%',
},
userPhoneContainer:{
    height: '30%',
    width: '100%',
},
userMailContainer:{
    height: '30%',
    width: '100%',
},
userInput:{
    fontSize: 16,
    fontWeight: '500',
    color: '#383330',
    paddingLeft: 20,
},

desctirtion:{
    fontWeight: 'bold',
},

settingsWrap:{
    borderRadius: 15,
    // marginTop: 30,
    flexDirection: 'column',
    width: '100%',
},

settingsButtonsText:{
    fontWeight: '600',
    fontSize: 16,
    color:'#383330',
},

buttonContent:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    padding: 13,
},

logOutButton:{
    fontWeight: '600',
    fontSize: 16,
    color:'#383330',
    color: '#f05d5d'
},

})