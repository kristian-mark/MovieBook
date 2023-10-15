import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function ProfileScreen({navigation}) {

    return (
    <View style={Styles.container}>
        <Text onPress={() => navigation.navigate('Profile')} style={Styles.text} >Profile Screen</Text>
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