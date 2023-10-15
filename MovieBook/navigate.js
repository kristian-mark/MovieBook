import React from 'react';
import MoviesScreen from './src/Navigation/screens/SearchScreen'
import FavoriteScreen from './src/Navigation/screens/FavoriteScreen'
import ProfileScreen from './src/Navigation/screens/ProfileScreens';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={MoviesScreen} options={{title: 'Search'}}/>
        <Stack.Screen name="Favourite" component={FavoriteScreen} options={{title: 'Favorites'}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
