import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            //logining
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                alert('Invalid email.')}
            else {
                alert('Unexpected error. Log in failed. Try again later.')}
        }
    }

    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response.user)
            alert('Check your Email!')
        } catch (error) {
            console.log(error.code)
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already registered.')}
            else {
                alert('Unexpected error. Registration failed. Try again later.')}
        }
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
                    onChangeText={(text) => setEmail(text)}
                    style={Styles.input}
                />
                <TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={Styles.input}
                    secureTextEntry={true}
                />
            </View>

            <View style={Styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={signIn}
                    style={Styles.button}
                >
                    <Text style={Styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={signUp}
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
