import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './navigation/mainContainer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './navigation/screens/LogIn'
import HomeScreen from './navigation/screens/HomeScreen';

const homeName = 'Home';


//check if user logged in
export let isUserLoggedIn = false;

export default function App() {
    const userLoggedIn = isUserLoggedIn;
    return (
      <MainContainer/>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
