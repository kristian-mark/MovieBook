import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditProfile() {
  return (
    <View style={Styles.container}>
      <Text>Edit screen</Text>
     </View>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})