import * as React from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text as RNText, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Screens
import LoginScreen from './screens/LogIn.js';
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/settingsScreen.js';
import editProfileScreen from './screens/editProfileScreen.js';

//Sceen Names
const homeName = 'Home';
const editProfileName = 'Edit My Profile';
const settingsName = 'Settings';

function MainApp(){
    return(
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName){
                        iconName = focused ? 'home' : 'home-outline';
                    } 
                    else if (rn  === settingsName){
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (rn === editProfileName){
                        iconName = focused ? 'person' : 'person-outline';
                    }


                    return<Ionicons name={iconName} size={size} color={color}/>
                },
            })}>

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={editProfileName} component={editProfileScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
    )

}

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='MainApp' component={MainApp}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
