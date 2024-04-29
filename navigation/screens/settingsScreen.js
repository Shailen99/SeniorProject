import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getAuth, signOut } from "firebase/auth";

function SettingsScreen() {
    const navigation = useNavigation(); // Use navigation to go back after logging out
    const auth = getAuth(); // Initialize Firebase Auth

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("User signed out");
            navigation.replace('Login'); // Navigate to login screen or any other appropriate screen
        }).catch((error) => {
            // An error happened.
            console.error("Sign out error:", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text>Click here to sign out.</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
