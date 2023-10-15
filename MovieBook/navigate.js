import React from 'react';
import MoviesScreen from './src/Navigation/screens/SearchScreen'
import Favorite from './src/Navigation/screens/FavoriteScreen'


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={MoviesScreen} options={{title: 'Search'}}/>
        <Stack.Screen name="Favourite" component={Favorite} options={{title: 'Favorites'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
