import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginScreen() {
    const auth = FIREBASE_AUTH;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleRegistering = () => {
        setIsRegistering(!isRegistering);
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Welcome back!')
            })
            .catch((error) => {
                console.log(error);
                switch(error.code) {
                    case 'auth/invalid-email':
                        alert('Invalid email.');
                        break;
                    case 'auth/wrong-password':
                        alert('Invalid login or password');
                        break;
                    case 'auth/user-disabled':
                        alert('Your account was disabled. Please contact support at zaluckijm@gmail.com');
                        break;
                    case 'https://firebase.google.com/support':
                        alert('Firebase server bug. Please report it to https://firebase.google.com/support');
                        break;
                    case 'auth/invalid-creation-time':
                        alert('Your time must be a valid UTC date')
                        break;
                    default:
                        alert('Unexpected error. Try again later or contact support.');
                        break;
                }
                throw error;
            });
    };

    const signUp = async () => {
        if (name === '' || phone === '') {
            alert('Please fill in all fields');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const createdAt = Date.now();
            const docRef = doc(FIREBASE_DB, 'Users', auth.currentUser.email);
            await setDoc(docRef, {
                createdAt,
                user_ID: auth.currentUser.uid,
                name: name,
                phone: phone,
                email: auth.currentUser.email,
                url: 'https://firebasestorage.googleapis.com/v0/b/moviebook-44898.appspot.com/o/no-profile-picture.png?alt=media&token=bb77bd19-34a3-438a-9925-a0b63e80d4b6',
                country: '',
                city: '',
                films: [],
            }, { merge: true });
            alert('Check your Email!');
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already registered.');
            } else {
                alert('Unexpected error. Try again later or contact support.');
            }
            throw error;
        }
    };

    const handleAuthAction = () => {
        if (isRegistering) {
            signUp();
        } else {
            signIn();
        }
    };

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
                {isRegistering && (
                    <>
                        <TextInput
                            placeholder='Name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={[Styles.input, name === '' ? Styles.invalidInput : null]}
                        />
                        <TextInput
                            placeholder='Phone'
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={[Styles.input, phone === '' ? Styles.invalidInput : null]}
                        />
                    </>
                )}
            </View>

            <View style={Styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleAuthAction}
                    style={Styles.button}
                >
                    <Text style={Styles.buttonText}>{isRegistering ? 'Register' : 'Login'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { toggleRegistering(); }}
                    style={[Styles.button, Styles.buttonOutline]}
                >
                    <Text style={Styles.buttonOutlineText}>{isRegistering ? 'Switch to Login' : 'Switch to Register'}</Text>
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
});