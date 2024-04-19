import React from 'react'
import { useNavigation } from '@react-navigation/core'
//import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
//import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';



function HomeScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const auth = getAuth();

  useEffect(() => {
    // This listener is triggered whenever the user's sign-in state changes.
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, set user email in state
        setUserEmail(user.email);
      } else {
        // User is signed out
        setUserEmail('');
      }
    });
    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.flexContainer}>
  <View style={styles.container}>
    {/* Profile Section */}
    <View style={styles.profileSection}>
      {/* Display the user's email */}
      <Text style={styles.profileContent}>Email: {userEmail}</Text>
      {/* Insert other profile content here */}
    </View>

    {/* Right Side Section */}
    <View style={styles.rightSideSection}>
      {/* Clique Connections */}
      <View style={styles.connectionsSection}>
        <Text style={styles.sectionTitle}>Clique Connections (3 to 5)</Text>
        {/* List of connections */}
        <ScrollView>
          <View style={styles.connectionItem}><Text>Connect 1</Text></View>
          <View style={styles.connectionItem}><Text>Connect 2</Text></View>
          <View style={styles.connectionItem}><Text>Connect 3</Text></View>
        </ScrollView>
      </View>

      {/* Community Section */}
      <View style={styles.communitySection}>
        <Text style={styles.sectionTitle}>Community (20 users)</Text>
        {/* List of community members */}
      </View>
    </View>
  </View>
</SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    
  flexContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row', // Align children in a row
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background for the entire page
  },
  profileSection: {
    flex: 3, // Takes 3/5 of the space
    backgroundColor: '#DDEFFF', // Light blue background for profile section
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    padding: 10, // Internal spacing
  },
  profileContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Assuming dark text for high contrast on light background
  },
  rightSideSection: {
    flex: 2, // Takes 2/5 of the space
    flexDirection: 'column', // Align children in a column
  },
  connectionsSection: {
    backgroundColor: '#EFF3FF', // Light blue background for connections
    padding: 10,
    borderRadius: 10, // Rounded corners
  },
  connectionItem: {
    backgroundColor: '#FFFFFF', // White background for each connection item
    padding: 10,
    borderRadius: 10, // Rounded corners for connection items
    marginBottom: 5, // Spacing between connection items
    width: '100%', // Connection items take the full width available
  },
  communitySection: {
    backgroundColor: '#EFF3FF', // Same background color as connections
    padding: 10,
    borderRadius: 10, // Rounded corners
    marginTop: 10, // Space between connections and community sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark color for titles
    marginBottom: 5, // Spacing between title and content
  },
  sectionText: {
    fontSize: 16,
    color: '#333', // Dark color for text
    textAlign: 'center',
  },
  
});

  