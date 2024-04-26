import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH, FIREBASE_DB, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

function EditProfileScreen() {
    // State definitions
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentMajor, setMajor] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [studyStyles, setStudyStyles] = useState({
        'Visual Learner': false,
        'Auditory Learner': false,
        'Read-Write Learner': false,
        'Kinesthetic Learner': false
    });
    const [locationPrefs, setLocPrefs] = useState({
        'Library': false,
        'Cafe': false,
        'Classroom': false,
        'Outdoors': false
    });
    const [areasToImprove, setAreasToImprove] = useState({
        'Time Management': false,
        'Note Taking': false,
        'Critical Thinking': false,
        'Problem Solving': false,
        'Communication Skills': false
    });
    const [shortTermGoals, setShortTermGoals] = useState({
        'N/A': false,
        'Improve grades': false,
        'Learn new study techniques': false,
        'Complete assignments on time': false,
        'Prepare for exams': false
    });
    const [longTermGoals, setLongTermGoals] = useState({
        'N/A': false,
        'Graduate with honors': false,
        'Get into a prestigious program': false,
        'Build a strong academic foundation': false,
        'Develop research skills': false
    });
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
    
            if (!result.cancelled && result.uri) {
                setProfileImage(result.uri);
            } else {
                console.log('Image picking cancelled or URI is null:', result);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };    

    //options for year and major
    const yearOptions = [
        { label: '1st Year', value: '1' },
        { label: '2nd Year', value: '2' },
        { label: '3rd Year', value: '3' },
        { label: '4th Year', value: '4' },
        { label: 'Graduate', value: 'graduate' },
    ];

    const majorOptions = [
        { label: 'Biology', value: 'biology' },
        { label: 'Computer Science', value: 'computer_science' },
        { label: 'Economics', value: 'economics' },
        { label: 'Mechanical Engineering', value: 'mechanical_engineering' },
        { label: 'Psychology', value: 'psychology' },
        { label: 'English Literature', value: 'english_literature' },
        { label: 'Chemistry', value: 'chemistry' },
        { label: 'Political Science', value: 'political_science' },
        { label: 'Business Administration', value: 'business_administration' },
        { label: 'Fine Arts', value: 'fine_arts' },
        { label: 'Physics', value: 'physics' },
        { label: 'History', value: 'history' },
        { label: 'Philosophy', value: 'philosophy' },
        { label: 'Sociology', value: 'sociology' },
        { label: 'Mathematics', value: 'mathematics' },
        { label: 'Environmental Science', value: 'environmental_science' },
        { label: 'Education', value: 'education' },
        { label: 'Nursing', value: 'nursing' },
        { label: 'Architecture', value: 'architecture' },
        { label: 'Music', value: 'music' }
    ];

    const locationOptions = ['Library', 'Cafe', 'Classroom', 'Outdoors'];

    const handleLocationChange = (location) => {
        setLocPrefs({ ...locationPrefs, [location]: !locationPrefs[location] });
    };

    const shortTermGoalsOptions = ['N/A', 'Improve grades', 'Learn new study techniques', 'Complete assignments on time', 'Prepare for exams'];

    const longTermGoalsOptions = ['N/A', 'Graduate with honors', 'Get into a prestigious program', 'Build a strong academic foundation', 'Develop research skills'];

    const handleSubmit = () => {
        const newData = {
            firstName,
            lastName,
            major: currentMajor,
            year: currentYear,
            studyStyles,
            locationPrefs,
            areasToImprove,
            shortTermGoals,
            longTermGoals
        }
        console.log(newData);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <>
                                <Icon name="camera" size={35} color="#fff" style={styles.icon} />
                                <Text>Insert Profile Picture</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <TextInput style={styles.input} value={firstName} placeholder="First Name" onChangeText={setFirstName} />
                    <TextInput style={styles.input} value={lastName} placeholder="Last Name" onChangeText={setLastName} />
                    <View style={styles.pickerContainer}>
                        <Text>Select Your Major</Text>
                        <Picker
                            selectedValue={currentMajor}
                            onValueChange={(itemValue, itemIndex) => setMajor(itemValue)}>
                            {majorOptions.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text>What's Your Grade Standing</Text>
                        <Picker
                            selectedValue={currentYear}
                            onValueChange={(itemValue, itemIndex) => setCurrentYear(itemValue)}>
                            {yearOptions.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                    {/* Prompts side by side */}
                    <View style={styles.rowContainer}>
                    {/* Study Style */}
                    <View style={[styles.column, styles.roundedContainer]}>
                        <Text style={styles.sectionTitle}>What's Your Study Style?</Text>
                        {Object.keys(studyStyles).map((style, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    status={studyStyles[style] ? 'checked' : 'unchecked'}
                                    onPress={() => setStudyStyles({ ...studyStyles, [style]: !studyStyles[style] })}
                                />
                                <Text>{style}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Location Preferences */}
                    <View style={[styles.column, styles.roundedContainer]}>
                        <Text style={styles.sectionTitle}>Location Preferences</Text>
                        {locationOptions.map((location, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    status={locationPrefs[location] ? 'checked' : 'unchecked'}
                                    onPress={() => handleLocationChange(location)}
                                />
                                <Text>{location}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Areas to Improve */}
                    <View style={[styles.column, styles.roundedContainer]}>
                        <Text style={styles.sectionTitle}>Areas to Improve</Text>
                        {Object.keys(areasToImprove).map((area, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    status={areasToImprove[area] ? 'checked' : 'unchecked'}
                                    onPress={() => setAreasToImprove({ ...areasToImprove, [area]: !areasToImprove[area] })}
                                />
                                <Text>{area}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Academic Goals (Short-term) */}
                    <View style={[styles.column, styles.roundedContainer]}>
                        <Text style={styles.sectionTitle}>Academic Goals (Short-term)</Text>
                        {shortTermGoalsOptions.map((goal, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    status={shortTermGoals[goal] ? 'checked' : 'unchecked'}
                                    onPress={() => setShortTermGoals({ ...shortTermGoals, [goal]: !shortTermGoals[goal] })}
                                />
                                <Text>{goal}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Academic Goals (Long-term) */}
                    <View style={[styles.column, styles.roundedContainer]}>
                        <Text style={styles.sectionTitle}>Academic Goals (Long-term)</Text>
                        {longTermGoalsOptions.map((goal, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    status={longTermGoals[goal] ? 'checked' : 'unchecked'}
                                    onPress={() => setLongTermGoals({ ...longTermGoals, [goal]: !longTermGoals[goal] })}
                                />
                                <Text>{goal}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                    <Button mode="contained" onPress={handleSubmit}>
                        Submit
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: "center", // Align items horizontally (center)
        justifyContent: "center", // Align items vertically (center)
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    imagePicker: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#0782f9',
        padding: 10,
        borderRadius: 10,
        width: 150, // Adjust the width here
        height: 150, // Adjust the height here
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    icon: {
        opacity: 0.7,
        marginBottom: 5,
    },
    input: {
        fontFamily: 'sans-serif',
        borderWidth: 2,
        borderColor: '#0782f9',
        padding: 10,
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pickerContainer: {
        fontFamily: 'sans-serif',
        borderWidth: 2,
        borderColor: '#0782f9',
        padding: 10,
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    column: {
        flex: 1,
    },
    roundedContainer: {
        fontFamily: 'sans-serif',
        width: '20%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0782f9',
        padding: 10,
        marginBottom: 20,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default EditProfileScreen;
