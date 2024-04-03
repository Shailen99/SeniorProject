import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const signIn = () => {
        // Implement sign in functionality
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/studyMan.jpg')} style={styles.image} />
            <Text style={styles.title}>Welcome to Study Partners!</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={password}
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={togglePasswordVisibility}>
                        <Image source={require('../../assets/eyeIcon.png')} style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Create one</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    formContainer: {
        width: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        paddingLeft: 15,
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 10,
    },
    eyeIcon: {
        width: 24,
        height: 24,
    },
    loginButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#888',
    },
    signUpLink: {
        color: '#2196F3',
    },
});

export default Login;
