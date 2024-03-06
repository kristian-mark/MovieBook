import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import IonIcons from 'react-native-vector-icons/Ionicons'
import NoImage from '../../assets/no-profile-picture.png'

export default function ProfileScreen({ navigation }) {
    const User = getAuth().currentUser;
    const [name, setName] = useState ('')
    const [phone, setPhone] = useState ('')

useEffect(() => {
    async function userData() {
        try{
            if (User){
                const docRef = doc(FIREBASE_DB, 'Users', User.uid);
                const userDoc = await getDoc(docRef);
                const userData = userDoc.data();

                setName(userData.name)
                setPhone(userData.phone)

            }
        } catch (error) {
            console.error(error)
        }
    }
    userData()
},[User])

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
                <Image style={Styles.userImg} source={{uri: User.photoURL != NoImage ? User.photoURL : require('../../assets/no-profile-picture.png')}}/>
                    <View style={Styles.textContainer}>
                        {/* Name */}
                        <View style={Styles.userNameContainer}>
                            <Text style={Styles.desctirtion}>Name:</Text>
                            <Text style={Styles.userInput}>{name ? name : 'no name'}</Text>
                        </View>
                        {/* Phone */}
                        <View style={Styles.userPhoneContainer}>
                            <Text style={Styles.desctirtion}>Phone number:</Text>
                            <Text style={Styles.userInput}>{phone ? phone : 'no phone'}</Text>
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
                {/* Edit profile */}
                <TouchableOpacity onPress={() =>{navigation.navigate('Edit Profile')}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Edit profile</Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>

                {/* Contact support */}
                <TouchableOpacity onPress={() => {}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Contact support </Text>
                        <IonIcons name='arrow-forward' size={20} color={'black'} /> 
                </TouchableOpacity>

                {/* Donate */}
                <TouchableOpacity onPress={() => {console.log(User)}} style={Styles.buttonContent}>
                        <Text style={Styles.settingsButtonsText}>Donate</Text>
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