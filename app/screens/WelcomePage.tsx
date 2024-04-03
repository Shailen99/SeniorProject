import React from 'react';
import { Text, ImageBackground, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
    const navigation = useNavigation();

    const signUp = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/libraryHomeBack.jpg')} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Productivity meets socializing</Text>
                    <Text style={styles.subHeaderText}>Studying but want to meet other students? Match with students with similar interests!</Text>
                    <TouchableOpacity style={styles.joinNowButton} onPress={signUp}>
                        <Text style={styles.buttonText}>Join now</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFF',
    },
    subHeaderText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 20,
    },
    joinNowButton: {
        backgroundColor: '#219ebc',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WelcomePage;
