import * as React from "react";

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons'

// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import FavoritesScreen from "./screens/FavoriteScreen";
import SearchScreen from "./screens/SearchScreen"
import ProfileScreen from "./screens/ProfileScreens";
import EditProfileScreen from "./screens/EditProfileScreen";
import MovieScreen from "./screens/MovieScreen";

// Screen names
const favoritesName = 'Favorites'
const searchName = 'Search'
const profileName = 'Profile'
const editProfile = 'Edit Profile'
const filmName = 'Movie'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

// BottomTabNavigation(you can change here only: icons, parameters, under icon name)
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
                <Tab.Screen name={searchName} component={SearchScreen} options={{headerTitleAlign: 'center', headerShown: false}}/>
                <Tab.Screen name={profileName} component={ProfileScreen} options={{headerTitleAlign: 'center'}}/>
            </Tab.Navigator>
    )
}

// StackNavigation where you can add StackScreens above BottomTabNavigation (like editProfile screen)
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
                    name={editProfile}
                    component={EditProfileScreen}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name={filmName}
                    component={MovieScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}