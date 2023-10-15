import React from 'react-native'
import { useEffect, useState } from 'react'
import MainContainer from './src/Navigation/MainContainer'
import LoginScreen from './src/Navigation/screens/LoginScreen'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebase'

function App(){
  const {user, setUser} = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  },[])

  if (user != null){
    return(
      <MainContainer />
    )
  } else {
    return(
      <LoginScreen />
    )
  }
}

export default App;