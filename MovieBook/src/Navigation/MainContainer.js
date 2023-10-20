import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import IonIcons from 'react-native-vector-icons/Ionicons'

// Screens
import SearchScreen from "./screens/SearchScreen"
import FavoritesScreen from "./screens/FavoriteScreen";
import ProfileScreen from "./screens/ProfileScreens";
import EditProfileScreen from "./screens/EditProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen names
const searchName = 'Search'
const favoritesName = 'Favorites'
const profileName = 'Profile'
const editName = 'Edit Profile'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()


function MainContainer(){
    return(
        <Tab.Navigator
        initialRouteName={searchName} 
        screenOptions={({route}) => ({
                tabBarActiveTintColor: '#864622',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {height: 20},
                tabBarStyle: {padding: 10, height:60},
                // headerShown: false,  //show tab header or not
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    
                    if(rn === searchName){
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (rn === favoritesName){
                        iconName = focused ? 'bookmark' : 'bookmark-outline'
                    } else if(rn === profileName){
                        iconName = focused ? 'person' : 'person-outline'
                    }
                    
                    return <IonIcons name={iconName} size={size} color={color} />
                }
            })}
            >

                <Tab.Screen name={favoritesName} component={FavoritesScreen} options={{headerTitleAlign: 'center'}}/>
                <Tab.Screen name={searchName} component={SearchScreen} options={{headerTitleAlign: 'center'}}/>
                <Tab.Screen name={profileName} component={ProfileScreen} options={{headerTitleAlign: 'center'}}/>
            </Tab.Navigator>
    )
}

export default function EditProfileFunc() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='MainContainer'
                    component={MainContainer}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={editName}
                    component={EditProfileScreen}
                    options={{headerTitleAlign: 'center'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}