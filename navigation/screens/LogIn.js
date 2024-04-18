import { useNavigation } from '@react-navigation/core'
import React , { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import MainContainer from '../mainContainer'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    console.log(FIREBASE_AUTH);
    const auth = getAuth();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubcribe = FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('MainApp')
            }
        })
    
        return unsubcribe
    }, [])
    

    const handleLogin = () => {
        console.log("Login button pressed");
        signInWithEmailAndPassword(auth,email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            });
    };
    
    const handleRegistration = () => {
        console.log("Registration button pressed");
        createUserWithEmailAndPassword(auth,email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with email:', user.email);
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            });
    };
        return (


        <KeyboardAvoidingView
            behavior="padding"
        >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={password }
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleRegistration}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>


        </View>


        </KeyboardAvoidingView>
    )
}

export default Login;


const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d91129',
    },

    inputContainer:{
        width:'80%',
    },

    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    button:{
        backgroundColor:'#0782f9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems: 'center',
    },

    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    buttonContainer:{
        width: '60%',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:40,
    },

    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2,
    },

    buttonOutlineText:{
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16,
    },


    titleText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 50,
        marginBottom:250,
    }


})
