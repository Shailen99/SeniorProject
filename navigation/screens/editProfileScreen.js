import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

function EditProfileScreen() {
    // State definitions
    const [currentYear, setCurrentYear] = useState('1');
    const [currentMajor, setMajor] = useState('biology');
    const [studyStyles, setStudyStyles] = useState({
        visual: false,
        auditory: false,
        readWrite: false,
        kinesthetic: false,
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImage(result.uri); // Assuming you have a setImage function
            console.log(result.uri); // Log the image URI or set state
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
    const locationOptions = ['Library', 'Cafe', 'Class', 'Outdoors'];
    const [locationPrefs, setLocPrefs] = useState({
        Library: false,
        Cafe: false,
        Class: false,
        Outdoors: false,
    });
    const handleLocationChange = (location) => {
        setLocationPrefs({ ...locationPrefs, [location]: !locationPrefs[location] });
    };
    const shortTermGoalsOptions = ['N/A', 'Improve grades', 'Learn new study techniques', 'Complete assignments on time', 'Prepare for exams'];
    const [shortTermGoal, setShortTermGoal] = useState({
        NA: false,
        GradeImprove: false,
        LearnTechs: false,
        OnTimeAssign: false,
        PrepareExam: false
    });
    const [areasToImprove, setAreasToImprove] = useState({
        TimeManage: false,
        Notetake: false,
        CritThink: false,
        ProbSolv: false,
        CommSkills: false
    });

    const longTermGoalsOptions = ['N/A', 'Graduate with honors', 'Get into a prestigious program', 'Build a strong academic foundation', 'Develop research skills'];
    const [longTermGoal, setLongTermGoal] = useState({
        NA: false,
        GradHonors: false,
        PrestigeProgram: false,
        StrongFoundation: false,
        ResearchSkills: false
    });

    const handleSubmit = () => {
        // Handle the form submission logic
        console.log("Form submitted!");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.form}>
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Icon name="camera" size={35} color="#fff" style={styles.icon} />
                            <Text>Insert Profile Picture</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder="First Name" />
                        <TextInput style={styles.input} placeholder="Last Name" />
                        <View style={styles.pickerContainer}>
                            <Text>Select Your Major</Text>
                            <Picker
                                selectedValue={currentMajor}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMajor(itemValue)
                                }>
                                {majorOptions.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}                            </Picker>
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
                        <View style={styles.checkboxRow}>
                            <Text>What's Your Study Style?</Text>
                            <Checkbox status={studyStyles.visual ? 'checked' : 'unchecked'} onPress={() => setStudyStyles({ ...studyStyles, visual: !studyStyles.visual })} />
                            <Text>Visual</Text>
                            <Checkbox status={studyStyles.auditory ? 'checked' : 'unchecked'} onPress={() => setStudyStyles({ ...studyStyles, auditory: !studyStyles.auditory })} />
                            <Text>Auditory</Text>
                            <Checkbox status={studyStyles.readWrite ? 'checked' : 'unchecked'} onPress={() => setStudyStyles({ ...studyStyles, readWrite: !studyStyles.readWrite })} />
                            <Text>Read/Write</Text>
                            <Checkbox status={studyStyles.kinesthetic ? 'checked' : 'unchecked'} onPress={() => setStudyStyles({ ...studyStyles, kinesthetic: !studyStyles.kinesthetic })} />
                            <Text>Kinesthetic</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <Text>Location Preferences</Text>
                            <Checkbox status={locationPrefs.Library ? 'checked' : 'unchecked'} onPress={() => setLocPrefs({ ...locationPrefs, Library: !locationPrefs.Library })} />
                            <Text>Library</Text>
                            <Checkbox status={locationPrefs.Cafe ? 'checked' : 'unchecked'} onPress={() => setLocPrefs({ ...locationPrefs, Cafe: !locationPrefs.Cafe })} />
                            <Text>Cafe</Text>
                            <Checkbox status={locationPrefs.Class ? 'checked' : 'unchecked'} onPress={() => setLocPrefs({ ...locationPrefs, Class: !locationPrefs.Class })} />
                            <Text>Classes</Text>
                            <Checkbox status={locationPrefs.Outdoors ? 'checked' : 'unchecked'} onPress={() => setLocPrefs({ ...locationPrefs, Outdoors: !locationPrefs.Outdoors })} />
                            <Text>Outdoors</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <Text>Areas to Improve</Text>
                            <Checkbox status={areasToImprove.TimeManage ? 'checked' : 'unchecked'} onPress={() => setAreasToImprove({ ...areasToImprove, TimeManage: !areasToImprove.TimeManage })} />
                            <Text>Time Management</Text> 
                            <Checkbox status={areasToImprove.Notetake ? 'checked' : 'unchecked'} onPress={() => setAreasToImprove({ ...areasToImprove, Notetake: !areasToImprove.Notetake })} />
                            <Text>Note Taking</Text>
                            <Checkbox status={areasToImprove.CritThink ? 'checked' : 'unchecked'} onPress={() => setAreasToImprove({ ...areasToImprove, CritThink: !areasToImprove.CritThink })} />
                            <Text>Critical Thinking</Text>
                            <Checkbox status={areasToImprove.ProbSolv ? 'checked' : 'unchecked'} onPress={() => setAreasToImprove({ ...areasToImprove, ProbSolv: !areasToImprove.ProbSolv })} />
                            <Text>Problem Solving</Text>
                            <Checkbox status={areasToImprove.CommSkills ? 'checked' : 'unchecked'} onPress={() => setAreasToImprove({ ...areasToImprove, CommSkills: !areasToImprove.CommSkills })} />
                            <Text>Communication Skills </Text>

                        </View>
                        <View style={styles.checkboxRow}>
                            <Text>Academic Goals (Short-term)</Text>
                            <Checkbox status={shortTermGoal.NA ? 'checked' : 'unchecked'} onPress={() => setShortTermGoal({ ...shortTermGoal, NA: !shortTermGoal.NA })} />
                            <Text>N/A</Text> 
                            <Checkbox status={shortTermGoal.GradeImprove ? 'checked' : 'unchecked'} onPress={() => setShortTermGoal({ ...shortTermGoal, GradeImprove: !shortTermGoal.GradeImprove })} />
                            <Text>Improve grades</Text>
                            <Checkbox status={shortTermGoal.LearnTechs ? 'checked' : 'unchecked'} onPress={() => setShortTermGoal({ ...shortTermGoal, LearnTechs: !shortTermGoal.LearnTechs })} />
                            <Text>Learn new study techniques</Text>
                            <Checkbox status={shortTermGoal.OnTimeAssign ? 'checked' : 'unchecked'} onPress={() => setShortTermGoal({ ...shortTermGoal, OnTimeAssign: !shortTermGoal.OnTimeAssign })} />
                            <Text>Complete assignments on time</Text>
                            <Checkbox status={shortTermGoal.PrepareExam ? 'checked' : 'unchecked'} onPress={() => setShortTermGoal({ ...shortTermGoal, PrepareExam: !shortTermGoal.PrepareExam })} />
                            <Text>Prepare for exams</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <Text>Academic Goals (Long-term)</Text>    
                            <Checkbox status={longTermGoal.NA ? 'checked' : 'unchecked'} onPress={() => setLongTermGoal({ ...longTermGoal, NA: !longTermGoal.NA })} />
                            <Text>N/A</Text> 
                            <Checkbox status={longTermGoal.GradHonors ? 'checked' : 'unchecked'} onPress={() => setLongTermGoal({ ...longTermGoal, GradHonors: !longTermGoal.GradHonors })} />
                            <Text>Graduate with honors</Text>
                            <Checkbox status={longTermGoal.PrestigeProgram ? 'checked' : 'unchecked'} onPress={() => setLongTermGoal({ ...longTermGoal, PrestigeProgram: !longTermGoal.PrestigeProgram })} />
                            <Text>Get into a prestigious program</Text>
                            <Checkbox status={longTermGoal.StrongFoundation ? 'checked' : 'unchecked'} onPress={() => setLongTermGoal({ ...longTermGoal, StrongFoundation: !longTermGoal.StrongFoundation })} />
                            <Text>Build a strong academic foundation</Text>
                            <Checkbox status={longTermGoal.ResearchSkills ? 'checked' : 'unchecked'} onPress={() => setLongTermGoal({ ...longTermGoal, ResearchSkills: !longTermGoal.ResearchSkills })} />
                            <Text>Develop research skills</Text>

                        </View>

                    </View>
                    <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />
                </ScrollView>
            </View>
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
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePicker: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    icon: {
        opacity: 0.7,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
    },
    submitButton: {
        marginTop: 20,
        width: '100%', // Ensuring button stretches to container width
        justifyContent: 'center',
        backgroundColor: 'blue', // Color for visibility
    }
});

export default EditProfileScreen;
