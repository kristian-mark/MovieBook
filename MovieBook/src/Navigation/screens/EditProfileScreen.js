import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={Styles.container}>
      <Text></Text>
      <Button
        title='click here'
        onPress={() => alert('Button clicked!')}
      />
     </View>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})