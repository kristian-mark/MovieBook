import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../../firebase';

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = FIREBASE_AUTH;

    const handleSignUp = () => {
        auth
    }

  return (
      <KeyboardAvoidingView
      style={Styles.container}
      behavior='padding'
      >
            <View style={Styles.inputContainer}>
                <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={Styles.input}
                />
                                <TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={Styles.input}
                    secureTextEntry
                />
            </View>

            <View style={Styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() =>{}}
                    style={Styles.button}
                >
                    <Text style={Styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() =>{}}
                    style={[Styles.button, Styles.buttonOutline]}
                >
                    <Text style={Styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
  );
}

const Styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},

inputContainer: {
    width: '80%',
},

input: {
    backgroundColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},

buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
},

button: {
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},

buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782f9',
    borderWidth: 2,
},

buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
},

buttonOutlineText: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16,
},
})
