import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';


export default function FavoritesScreen({navigation}) {
    const User = getAuth().currentUser;

    return (
    <View style={Styles.container}>
        <Text onPress={() => navigation.navigate('Favorites')} style={Styles.text} >Favorites Screen</Text>
        <Image width={100} height={100} style={{backgroundColor: 'gray'}} source={User.photoURL}/>
    </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 26,
        fontWeight: 'bold',
    },

})