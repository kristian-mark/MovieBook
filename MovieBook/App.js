import React from 'react-native'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebase'
import MainContainer from './src/Navigation/MainContainer'
import LoginScreen from './src/Navigation/screens/LoginScreen'

function App(){
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  },[])

  if (user === null){
    return(
      <LoginScreen />
      )
    } else {
      return(
      <MainContainer />
    )
  }
}

export default App;