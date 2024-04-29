import { useNavigation } from '@react-navigation/core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import MainContainer from '../mainContainer'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { saveUserEmail } from '../../verifyEmail';
import { Image } from 'react-native';





const Login = () => {
    console.log(FIREBASE_AUTH);
    const auth = getAuth();
    const db = getFirestore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        signInWithEmailAndPassword(auth, email, password)
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

    const MyComponent = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello, Indie Flower!</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {/* Title */}
            <Image
                source={require('../../assets/loginBGP.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.borderContainer}>
                {/* Left Container */}
                <View style={styles.leftContainer}>
                    <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
                    <Text style={styles.title}>MeetNStudy</Text>
            {/* Description */}
            <Text style={styles.description}>Welcome back! Get connected to students with similar study habits.</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Email'
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder='Password'
                                value={password}
                                onChangeText={setPassword}
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
                </View>
                {/* Right Container */}
                <View style={styles.rightContainer}>
                    <Image
                        source={require('../../assets/studyMan.jpg')}
                        style={styles.image}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Set background color to white
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    borderContainer: {
        width: '70%',
        height: '80%',
        borderWidth: 4,
        borderColor: '#ddf6fd',
        borderRadius:10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    rightContainer: {
        flex: 1,
        paddingHorizontal: 20,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '70%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '70%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
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
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '800',
        fontSize: 16,
    },
    title: {
        fontFamily: 'IndieFlower-Regular',
        fontSize: 50,
        marginBottom: 5,
    },
    description: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        marginBottom: 20,
        marginTop: 30,
    },
    image: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
    },
});

export default Login;
