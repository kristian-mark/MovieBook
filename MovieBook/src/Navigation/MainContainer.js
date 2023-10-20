import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from 'react-native-vector-icons/Ionicons'

// Screens
import SearchScreen from "./screens/SearchScreen"
import FavoritesScreen from "./screens/FavoriteScreen";
import ProfileScreen from "./screens/ProfileScreens";

// Screen names
const searchName = 'Search'
const favoritesName = 'Favorites'
const profileName = 'Profile'

const Bot = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Bot.Navigator
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
            })}>

                <Bot.Screen name={favoritesName} component={FavoritesScreen} options={{headerTitleAlign: 'center'}}/>
                <Bot.Screen name={searchName} component={SearchScreen} options={{headerTitleAlign: 'center'}}/>
                <Bot.Screen name={profileName} component={ProfileScreen} options={{headerTitleAlign: 'center'}}/>

            </Bot.Navigator>
        </NavigationContainer>
    )
}