import React from 'react-native'
import MainContainer from './src/Navigation/MainContainer'
import LoginScreen from './src/Navigation/screens/LoginScreen';

const qwerty = 1;
function App(){
  if(qwerty){
  return(
    <LoginScreen />
    // <MainContainer />
  )
} else {
  return(
    <MainContainer />
  )
}
}

export default App;