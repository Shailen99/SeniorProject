import { useNavigation } from '@react-navigation/core'
import React , { createContext, useContext,useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import MainContainer from '../mainContainer'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { saveUserEmail } from '../../verifyEmail';



const Login = () => {
    console.log(FIREBASE_AUTH);
    const auth = getAuth();
    const db = getFirestore();
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
    
    
    const handleRegistration = async () => {
        console.log("Registration button pressed");
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log('Registered with email:', user.email);

            await saveUserEmail(email);
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                password: user.password,
                firstName: '', // Ĭ��Ϊ���ַ���
                lastName: '', // Ĭ��Ϊ���ַ���
                major: '', // Ĭ��Ϊ���ַ���
                year: '', // Ĭ��Ϊ���ַ���
                studyStyles: '', // Ĭ��Ϊ���ַ���
                locationPrefs: '', // Ĭ��Ϊ���ַ���
                areasToImprove: '', // Ĭ��Ϊ���ַ���
                shortTermGoals: '', // Ĭ��Ϊ���ַ���
                longTermGoals: '', // Ĭ��Ϊ���ַ���
            });

            Alert.alert("Success", "Registration successful and data saved to Firestore.");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };
    
    
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.header}>Welcome Back!</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRegistration} style={styles.buttonOutline}>
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Placeholder for your image */}
            <View style={styles.imageContainer}>
            
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Adjusting to row layout
        backgroundColor: '#f6f5f7',
    },
    formContainer: {
        flex: 1, // Takes 50% of the width
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0782f9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#0782f9',
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16,
    },
    imageContainer: {
        flex: 1, // Takes 50% of the width
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Login;
