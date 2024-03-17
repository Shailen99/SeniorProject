import React, { useState } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text as RNText, Platform } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './app/screens/CreateProfile';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Logged In!');
    } catch (error) {
      console.log(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('CreateProfile');
    } catch (error) {
      console.log(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ImageBackground source={require('../../assets/img_homeback.jpg')} style={styles.background}>
        <Text style={styles.exampleText}>Study Partners</Text>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Enter your email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
              <>
                <TouchableOpacity style={[styles.button, styles.loginButtonOutline]} onPress={() => signIn()}>
                  <RNText style={styles.buttonText}>Log In</RNText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signupButtonOutline]} onPress={() => signUp()}>
                  <RNText style={styles.buttonText}>Sign Up</RNText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#023047',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff', // Set input background color to white
    color: '#000', // Set input text color
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#219ebc',
    fontWeight: 'bold',
  },
  loginButtonOutline: {
    borderWidth: 1,
    borderColor: '#219ebc',
  },
  signupButtonOutline: {
    borderWidth: 1,
    borderColor: '#219ebc',
  },
  exampleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Text color
    position: 'absolute',
    top: 50,
    textShadowColor: '#000', // Outline color
    textShadowOffset: { width: -1, height: 1 }, // Outline offset
    textShadowRadius: 5, // Outline thickness
  },
});
