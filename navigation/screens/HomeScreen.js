import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";


function HomeScreen() {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={tw`flex-1`}>
            <View style={tw`items-center relative`}>
            <TouchableOpacity
          style={tw`absolute left-5 top-3`}
          onPress={() => navigation.navigate("Edit")}
        ></TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',  // Optional: change background color of the whole page
    },
    coloredBox: {
      width: '90%',
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#4CAF50',
      alignItems: 'center',
      borderRadius: 10, // Optional: if you want rounded corners
    },
    normalBox: {
      width: '90%',
      padding: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 10, // Optional: if you want rounded corners
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    sectionText: {
      marginTop: 10,
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
    }
  });
  