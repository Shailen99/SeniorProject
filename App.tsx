import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/LogIn';
import Home from './app/screens/HomeScreen';
import CreateProfile from './app/screens/CreateProfile';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator(); // Capitalized component name

function InsideLayout() { // Capitalized function name
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home}/>
      <InsideStack.Screen name="CreateProfile" component={CreateProfile}/>
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      sessionStorage.setItem('uid',user['uid']);
      console.log('user', user['uid']);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
