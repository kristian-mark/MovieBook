import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

//screens
import EditProfileScreen from './screens/EditProfileScreen';


const Stack = createStackNavigator()
const ProfileNavigation = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen name='Edit profile' component={EditProfileScreen}/>
        </Stack.Navigator>
  );
}

export default ProfileNavigation