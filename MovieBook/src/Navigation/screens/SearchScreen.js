import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function SearchScreen({navigation}) {

    return (
    <View style={Styles.container}>
        <Text onPress={() => navigation.navigate('Search')} style={Styles.text} >Search Screen</Text>
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