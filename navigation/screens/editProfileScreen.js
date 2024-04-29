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


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // �û��ѵ�¼�����Է��� user ����
        const userId = user.uid;
        console.log("User ID:", userId);
        const currentUser = auth.currentUser;
        console.log("Current user:", currentUser);
    } else {
        // �û�δ��¼��ִ�������߼�
        console.log("No user is currently logged in.");
    }
});


function EditProfileScreen() {
    // State definitions
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentMajor, setMajor] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [studyStyles, setStudyStyles] = useState({
        visual: false,
        auditory: false,
        readWrite: false,
        kinesthetic: false
    });
    const [locationPrefs, setLocPrefs] = useState({
        Library: false,
        Cafe: false,
        Class: false,
        Outdoors: false
    });
    const [areasToImprove, setAreasToImprove] = useState({
        TimeManage: false,
        Notetake: false,
        CritThink: false,
        ProbSolv: false,
        CommSkills: false
    });
    const [shortTermGoals, setShortTermGoals] = useState({
        NA: false,
        GradeImprove: false,
        LearnTechs: false,
        OnTimeAssign: false,
        PrepareExam: false
    });
    const [longTermGoals, setLongTermGoals] = useState({
        NA: false,
        GradHonors: false,
        PrestigeProgram: false,
        StrongFoundation: false,
        ResearchSkills: false
    });

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

    const [buttonText, setButtonText] = useState('Submit');
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        console.log("Current user ID:", user);
    } else {
        console.log("No user is currently logged in.");
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


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
                        setStudyStyles(userData.studyStyles || {});
                        setLocPrefs(userData.locationPrefs || {});
                        setAreasToImprove(userData.areasToImprove || {});
                        setShortTermGoals(userData.shortTermGoals || {});
                        setLongTermGoals(userData.longTermGoals || {});
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

    const handleSubmit = async () => {
        if (user) { // Check if user is authenticated and not null
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
            const newData = {
                firstName,
                lastName,
                major: currentMajor,
                year: currentYear,
                studyStyles,
                locationPrefs,
                areasToImprove,
                shortTermGoals,
                longTermGoals,
                photoUrl: previewUrl,
                uid: user.uid
            };

            try {
                await setDoc(userDocRef, newData, { merge: true }); // Use merge to avoid overwriting existing data
                console.log('Success: Data stored in Firestore without overwriting existing fields');
                // Optionally, update the UI to reflect the success
                alert('Success！');
                window.location.reload();
            } catch (error) {
                console.error('Failed:', error);
                alert('Failed');
                // Optionally, update the UI to reflect the failure
            }

            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    return docSnap.data(); // Returns the document data
                } else {
                    console.log("No such document!");
                    return null; // Handle the case where there is no document
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                return null; // Handle error cases appropriately
            }
        } else {
            console.log("User is not logged in.");
            // Handle not logged in user
        }
    };



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.form}>
                        <View style={styles.profilePictureContainer}>
                            <Text>Insert Profile Picture</Text>
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                            {previewUrl && (
                                <div>
                                    <h3>Preview:</h3>
                                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
                        </View>
                        <TextInput style={styles.input} value={firstName} placeholder="First Name" onChangeText={setFirstName} />
                        <TextInput style={styles.input} value={lastName} placeholder="Last Name" onChangeText={setLastName} />
                        <View style={[styles.columnContainer, { marginRight: 10, marginBottom: 10 }]}>
                            <Text style={styles.inputLabel}>Select Your Major</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={currentMajor}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMajor(itemValue)
                                }>
                                {majorOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.columnContainer}>
                            <Text style={styles.inputLabel}>What's Your Grade Standing</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={currentYear}
                                onValueChange={(itemValue, itemIndex) => setCurrentYear(itemValue)}>
                                {yearOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.sectionContainer}>
                                <View style={styles.columnContainer}>
                                    <Text>What's Your Study Style?</Text>
                                    <View style={styles.checkboxRow}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={studyStyles.visual ? 'checked' : 'unchecked'}
                                                onPress={() => setStudyStyles({ ...studyStyles, visual: !studyStyles.visual })}
                                            />
                                            <Text style={styles.checkboxLabel}>Visual</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={studyStyles.auditory ? 'checked' : 'unchecked'}
                                                onPress={() => setStudyStyles({ ...studyStyles, auditory: !studyStyles.auditory })}
                                            />
                                            <Text style={styles.checkboxLabel}>Auditory</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={studyStyles.readWrite ? 'checked' : 'unchecked'}
                                                onPress={() => setStudyStyles({ ...studyStyles, readWrite: !studyStyles.readWrite })}
                                            />
                                            <Text style={styles.checkboxLabel}>Read/Write</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={studyStyles.kinesthetic ? 'checked' : 'unchecked'}
                                                onPress={() => setStudyStyles({ ...studyStyles, kinesthetic: !studyStyles.kinesthetic })}
                                            />
                                            <Text style={styles.checkboxLabel}>Kinesthetic</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <View style={styles.columnContainer}>
                                    <Text>Location Preferences</Text>
                                    <View style={styles.checkboxRow}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={locationPrefs.Library ? 'checked' : 'unchecked'}
                                                onPress={() => setLocPrefs({ ...locationPrefs, Library: !locationPrefs.Library })}
                                            />
                                            <Text style={styles.checkboxLabel}>Library</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={locationPrefs.Cafe ? 'checked' : 'unchecked'}
                                                onPress={() => setLocPrefs({ ...locationPrefs, Cafe: !locationPrefs.Cafe })}
                                            />
                                            <Text style={styles.checkboxLabel}>Cafe</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={locationPrefs.Class ? 'checked' : 'unchecked'}
                                                onPress={() => setLocPrefs({ ...locationPrefs, Class: !locationPrefs.Class })}
                                            />
                                            <Text style={styles.checkboxLabel}>Classes</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={locationPrefs.Outdoors ? 'checked' : 'unchecked'}
                                                onPress={() => setLocPrefs({ ...locationPrefs, Outdoors: !locationPrefs.Outdoors })}
                                            />
                                            <Text style={styles.checkboxLabel}>Outdoors</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.sectionContainer}>
                                <View style={styles.columnContainer}>
                                    <Text>Areas to Improve</Text>
                                    <View style={styles.checkboxRow}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={areasToImprove.TimeManage ? 'checked' : 'unchecked'}
                                                onPress={() => setAreasToImprove({ ...areasToImprove, TimeManage: !areasToImprove.TimeManage })}
                                            />
                                            <Text style={styles.checkboxLabel}>Time Management</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={areasToImprove.Notetake ? 'checked' : 'unchecked'}
                                                onPress={() => setAreasToImprove({ ...areasToImprove, Notetake: !areasToImprove.Notetake })}
                                            />
                                            <Text style={styles.checkboxLabel}>Note Taking</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={areasToImprove.CritThink ? 'checked' : 'unchecked'}
                                                onPress={() => setAreasToImprove({ ...areasToImprove, CritThink: !areasToImprove.CritThink })}
                                            />
                                            <Text style={styles.checkboxLabel}>Critical Thinking</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={areasToImprove.ProbSolv ? 'checked' : 'unchecked'}
                                                onPress={() => setAreasToImprove({ ...areasToImprove, ProbSolv: !areasToImprove.ProbSolv })}
                                            />
                                            <Text style={styles.checkboxLabel}>Problem Solving</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={areasToImprove.CommSkills ? 'checked' : 'unchecked'}
                                                onPress={() => setAreasToImprove({ ...areasToImprove, CommSkills: !areasToImprove.CommSkills })}
                                            />
                                            <Text style={styles.checkboxLabel}>Communication Skills</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.sectionContainer}>
                                <View style={styles.columnContainer}>
                                    <Text>Academic Goals (Short-term)</Text>
                                    <View style={styles.checkboxRow}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={shortTermGoals.NA ? 'checked' : 'unchecked'}
                                                onPress={() => setShortTermGoals({ ...shortTermGoals, NA: !shortTermGoals.NA })}
                                            />
                                            <Text style={styles.checkboxLabel}>N/A</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={shortTermGoals.GradeImprove ? 'checked' : 'unchecked'}
                                                onPress={() => setShortTermGoals({ ...shortTermGoals, GradeImprove: !shortTermGoals.GradeImprove })}
                                            />
                                            <Text style={styles.checkboxLabel}>Improve grades</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={shortTermGoals.LearnTechs ? 'checked' : 'unchecked'}
                                                onPress={() => setShortTermGoals({ ...shortTermGoals, LearnTechs: !shortTermGoals.LearnTechs })}
                                            />
                                            <Text style={styles.checkboxLabel}>Learn new study techniques</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={shortTermGoals.OnTimeAssign ? 'checked' : 'unchecked'}
                                                onPress={() => setShortTermGoals({ ...shortTermGoals, OnTimeAssign: !shortTermGoals.OnTimeAssign })}
                                            />
                                            <Text style={styles.checkboxLabel}>Complete assignments on time</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={shortTermGoals.PrepareExam ? 'checked' : 'unchecked'}
                                                onPress={() => setShortTermGoals({ ...shortTermGoals, PrepareExam: !shortTermGoals.PrepareExam })}
                                            />
                                            <Text style={styles.checkboxLabel}>Prepare for exams</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.sectionContainer}>
                                <View style={styles.columnContainer}>
                                    <Text>Academic Goals (Long-term)</Text>
                                    <View style={styles.checkboxRow}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={longTermGoals.NA ? 'checked' : 'unchecked'}
                                                onPress={() => setLongTermGoals({ ...longTermGoals, NA: !longTermGoals.NA })}
                                            />
                                            <Text style={styles.checkboxLabel}>N/A</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={longTermGoals.GradHonors ? 'checked' : 'unchecked'}
                                                onPress={() => setLongTermGoals({ ...longTermGoals, GradHonors: !longTermGoals.GradHonors })}
                                            />
                                            <Text style={styles.checkboxLabel}>Graduate with honors</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={longTermGoals.PrestigeProgram ? 'checked' : 'unchecked'}
                                                onPress={() => setLongTermGoals({ ...longTermGoals, PrestigeProgram: !longTermGoals.PrestigeProgram })}
                                            />
                                            <Text style={styles.checkboxLabel}>Get into a prestigious program</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={longTermGoals.StrongFoundation ? 'checked' : 'unchecked'}
                                                onPress={() => setLongTermGoals({ ...longTermGoals, StrongFoundation: !longTermGoals.StrongFoundation })}
                                            />
                                            <Text style={styles.checkboxLabel}>Build a strong academic foundation</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={longTermGoals.ResearchSkills ? 'checked' : 'unchecked'}
                                                onPress={() => setLongTermGoals({ ...longTermGoals, ResearchSkills: !longTermGoals.ResearchSkills })}
                                            />
                                            <Text style={styles.checkboxLabel}>Develop research skills</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                            {buttonText}
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        width: 300, // Adjust the width as needed
        height: 300, // Adjust the height as needed to create a square
        justifyContent: 'center', // Center the content horizontally
        alignSelf: 'center', // Align the container itself to the center horizontally
        overflow: 'hidden', // Ensure the content stays within the rounded square
    },     
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'stretch', // Stretch items horizontally
        justifyContent: 'center',
    },
    sectionContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        width: 350,
        marginTop: 7, // Adjust this value to control the space between sections
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    form: {
        alignItems: 'stretch',
    },
    input: {
        fontFamily: 'sans-serif',
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10, // Adjust this value to control the space between inputs
        borderRadius: 10,
    },
    pickerContainer: {
        fontFamily: 'sans-serif',
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10, // Adjust this value to control the space between pickers
        borderRadius: 10,
    },
    picker: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        color: 'black', // Text color
        marginBottom: 10,
        fontFamily: 'sans-serif',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Adjust this value to control the space between rows
    },
    columnContainer: {
        flex: 1,
        marginTop: 10, // Adjust this value to control the space at the top of columns
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20, // Adjust this value to control the space between checkboxes
        marginBottom: 10, // Adjust this value to control the space between checkbox rows
    },
    checkboxLabel: {
        marginLeft: 5, // Adjust this value to control the space between checkbox and label
    },
    button: {
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#81dff6', // Blue color
    }

});


export default EditProfileScreen;

