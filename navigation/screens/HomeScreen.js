import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Button } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import tw from "twrnc";
import { Picker } from 'react-native';
import { Checkbox } from 'react-native-paper';
import userData from '../screens/data.json';

import { getFirestore, addDoc, doc, updateDoc,collection } from "firebase/firestore";
import { getDoc } from "firebase/firestore";



function HomeScreen() {
    const [selectedYear, setSelectedYear] = useState('0');
    const [selectedMajor, setSelectedMajor] = useState('0');
    const [selectedStyle, setSelectedStyle] = useState('0');
    const [selectedLocation, setSelectedLocation] = useState('0');
    const [selectedArea, setSelectedArea] = useState('0');
    const [selectedShort, setSelectedShort] = useState('0');
    const [selectedLong, setSelectedLong] = useState('0');

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
    const styleOptions = [{ label: 'Visual', value: 'visual' },
        { label: 'Auditory', value: 'auditory' },
        { label: 'ReadWrite', value: 'readWrite' },
        { label: 'Kinesthetic', value: 'kinesthetic' }
    ];
    const locationOptions = [{ label: 'Library', value: 'library' },
        { label: 'Cafe', value: 'cafe' },
        { label: 'Class', value: 'class' },
        { label: 'Outdoors', value: 'outdoors' }
    ];
    const areaOptions = [{ label: 'TimeManage', value: 'timeManage' },
        { label: 'Notetake', value: 'notetake' },
        { label: 'CritThink', value: 'critThink' },
        { label: 'ProbSolv', value: 'probSolv' },
        { label: 'CommSkills', value: 'commSkills' }
    ];
    const shortTermGoalsOptions = [{ label: 'Improve grades', value: 'Improve grades' },
        { label: 'Learn new study techniques', value: 'Learn new study techniques' },
        { label: 'Complete assignments on time', value: 'Complete assignments on time' },
        { label: 'Prepare for exams', value: 'Prepare for exams' }
    ];
    const longTermGoalsOptions = [{ label: 'Graduate with honors', value: 'Graduate with honors' },
        { label: 'Get into a prestigious program', value: 'Get into a prestigious program' },
        { label: 'Build a strong academic foundation', value: 'Build a strong academic foundation' },
        { label: 'Develop research skills', value: 'Develop research skills' }
    ];

    const [previewUrl, setPreviewUrl] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentMajor, setMajor] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;


    useEffect(() => {
        async function fetchUserData() {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const db = getFirestore();
                const userDocRef = doc(db, 'users', userId);

                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Fill form fields with user data
                        setPreviewUrl(userData.photoUrl || null);
                        setFirstName(userData.firstName || '');
                        setLastName(userData.lastName || '');
                        setMajor(userData.major || '');
                        setCurrentYear(userData.year || '');
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            } else {
                console.log("User is not logged in.");
            }
        }
        fetchUserData();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);

    const usersDatabase = userData;
    const handleSearch = () => {
        const filterData = {
            year: selectedYear,
            major: selectedMajor,
            studyStyle: selectedStyle,
            location: selectedLocation,
            areaToImprove: selectedArea,
            shortTermGoals: selectedShort,
            longTermGoals: selectedLong,
        };
        console.log('Whats now:', filterData);
        const filteredUsers = usersDatabase.filter(user =>
            (filterData.year === '0' || user.year === filterData.year) &&
            (filterData.major === '0' || user.major === filterData.major) &&
            (filterData.studyStyle === '0' || user.studyStyle === filterData.studyStyle) &&
            (filterData.location === '0' || user.location === filterData.location) &&
            (filterData.areaToImprove === '0' || user.areaToImprove === filterData.areaToImprove) &&
            (filterData.shortTermGoal === '0' || user.shortTermGoals === filterData.shortTermGoals) &&
            (filterData.longTermGoal === '0' || user.longTermGoals === filterData.longTermGoals)
        ).slice(0, 3); // Limit to top 3 matches
        console.log('Matching users:', filteredUsers);
        setMatchedUsers(filteredUsers);
        setShowModal(true); // Show the modal with results
    };


    return (
        <SafeAreaView style={styles.flexContainer}>
            <View style={styles.container}>
                <View style={styles.profileSection}>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />   
                    <Text style={styles.profileContent}>Email: {userEmail}</Text>
                    <Text style={styles.profileContent}>First Name: {firstName}</Text>
                    <Text style={styles.profileContent}>Last Name: {lastName}</Text>
                    <Text style={styles.profileContent}>Current Major: {currentMajor}</Text>
                    <Text style={styles.profileContent}>Current Year: {currentYear}</Text>
                </View>
                <View style={styles.rightSideSection}>
                    <View style={styles.connectionsSection}>
                        <Text style={styles.sectionTitle}>Clique Connections (3 to 5)</Text>
                        <ScrollView>
                            <View style={styles.connectionItem}><Text>Connect 1</Text></View>
                            <View style={styles.connectionItem}><Text>Connect 2</Text></View>
                            <View style={styles.connectionItem}><Text>Connect 3</Text></View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Year:</Text>
                                    <Picker
                                        selectedValue={selectedYear}
                                        onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                                    >
                                        <Picker.Item label="--Select year--" value={'0'} />
                                        {yearOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Major:</Text>
                                    <Picker
                                        selectedValue={selectedMajor}
                                        onValueChange={(itemValue, itemIndex) => setSelectedMajor(itemValue)}
                                    >
                                        <Picker.Item label="--Select major--" value={'0'} />
                                        {majorOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>
                                
                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Study Style:</Text>
                                    <Picker
                                        selectedValue={selectedStyle}
                                        onValueChange={(itemValue, itemIndex) => setSelectedStyle(itemValue)}
                                    >
                                        <Picker.Item label="--Select study styles--" value={'0'} />
                                        {styleOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Location Preferences:</Text>
                                    <Picker
                                        selectedValue={selectedLocation}
                                        onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
                                    >
                                        <Picker.Item label="--Select prefer location--" value={'0'} />
                                        {locationOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Areas to Improve:</Text>
                                    <Picker
                                        selectedValue={selectedArea}
                                        onValueChange={(itemValue, itemIndex) => setSelectedArea(itemValue)}
                                    >
                                        <Picker.Item label="--Select areas to improve--" value={'0'} />
                                        {areaOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Short-Term Goal:</Text>
                                    <Picker
                                        selectedValue={selectedShort}
                                        onValueChange={(itemValue, itemIndex) => setSelectedShort(itemValue)}
                                    >
                                        <Picker.Item label="--Select short term goal--" value={'0'} />
                                        {shortTermGoalsOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Long-Term Goal:</Text>
                                    <Picker
                                        selectedValue={selectedLong}
                                        onValueChange={(itemValue, itemIndex) => setSelectedLong(itemValue)}
                                    >
                                        <Picker.Item label="--Select longterm goal--" value={'0'} />
                                        {longTermGoalsOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>
                            </ScrollView>
                            <Button title="Search" onPress={() => { handleSearch(); setModalVisible(false); }} />
                        </View>


                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(false);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.row}>
                                    {matchedUsers.map((user, index) => (
                                        <View key={index} style={styles.userBox}>
                                            <Text style={styles.modalText}>{user.firstName} {user.lastName}</Text>
                                            <Text style={styles.modalText}>Year: {user.year}</Text>
                                            <Text style={styles.modalText}>Major: {user.major}</Text>
                                        </View>
                                    ))}
                                </View>
                                <Button
                                    title="Close"
                                    onPress={() => setShowModal(false)}
                                />
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        width: '90%', 
        maxHeight: '80%', 
    },
    userBox: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    pickerStyle: {
        width: '100%',
        marginBottom: 20,
    },
    flexContainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    profileSection: {
        flex: 3,
        backgroundColor: '#DDEFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    profileContent: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    rightSideSection: {
        flex: 2,
        flexDirection: 'column',
    },
    connectionsSection: {
        backgroundColor: '#EFF3FF',
        padding: 10,
        borderRadius: 10,
    },
    connectionItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        width: '100%',
    },
    searchButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    modalView: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#333',
    },
    filterCheckbox: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    filterText: {
        fontSize: 16,
        marginLeft: 8,
    },
});
