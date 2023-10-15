import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function FavoritesScreen({navigation}) {

    return (
    <View style={Styles.container}>
        <Text onPress={() => navigation.navgate('Favorites')} style={Styles.text} >Favorites Screen</Text>
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