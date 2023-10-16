import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXYKTKddVBsV5xOzNtb6x0ijVoOS5UeJA",
  authDomain: "moviebook-44898.firebaseapp.com",
  projectId: "moviebook-44898",
  storageBucket: "moviebook-44898.appspot.com",
  messagingSenderId: "522242994887",
  appId: "1:522242994887:web:bef07c41ce2ca48eb304e2"
};
// Initialize Firebase
export const FIREBASE_APP = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);