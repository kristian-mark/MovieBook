import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';

export default function EditProfile() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={Styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.container}>
          <Text>Edit screen</Text>
        </View>
        
        {/* Buttons */}
        <View style={Styles.buttonsContainer}>
          <Button title='Cancel' color={'tomato'}/>
          <Button title='Save'/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container:{},
  buttonsContainer:{
    width: '120%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

})