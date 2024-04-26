import { ScrollView, View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { FIREBASE_DB } from '../../FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { reauthenticateWithRedirect } from 'firebase/auth';
function editProfileScreen() {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImagePresent(true);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ paddingBottom: 80 }}>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity onPress={pickImage}>
                                    <View
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 15,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>Insert Profile Picture</Text>
                                        <Icon
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#fff",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* Text input fields */}
                            {/* First Name & Last Name */}
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="First Name"
                                />
                            </View>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="Last Name"
                                />
                            </View>
                            {/* Number of Classes Dropdown */}
                            <View style={styles.action}>
                                <Text>Number of Classes:</Text>
                                <RNPickerSelect
                                    style={pickerSelectStyles}
                                    onValueChange={(value) => setNumClasses(value)}
                                    value={numClasses}
                                    items={[
                                        { label: '1', value: 1 },
                                        { label: '2', value: 2 },
                                        { label: '3', value: 3 },
                                        { label: '4', value: 4 },
                                        { label: '5', value: 5 },
                                        { label: '6', value: 6 },
                                        { label: '7', value: 7 },
                                    ]}
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default editProfileScreen

const styles = StyleSheet.create({

    // This changes the whole page
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
