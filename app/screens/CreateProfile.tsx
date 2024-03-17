import { ScrollView, View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const CreateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numClasses, setNumClasses] = useState(1);
  const [courseData, setCourseData] = useState([{ code: '', name: '' }]);
  const [shortTermGoals, setShortTermGoals] = useState([]);
  const [longTermGoals, setLongTermGoals] = useState([]);
  const [areasToImprove, setAreasToImprove] = useState([]);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Define options for short-term and long-term goals
  const shortTermGoalsOptions = ['N/A','Improve grades', 'Learn new study techniques', 'Complete assignments on time', 'Prepare for exams'];
  const longTermGoalsOptions = ['N/A','Graduate with honors', 'Get into a prestigious program', 'Build a strong academic foundation', 'Develop research skills'];

  // Define options for areas to improve
  const areasToImproveOptions = ['Time management', 'Note-taking', 'Critical thinking', 'Problem-solving', 'Communication skills'];

  const handleFirstNameChange = (value) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value) => {
    setLastName(value);
  };

  const handleNumClassesChange = (value) => {
    const num = parseInt(value);
    setNumClasses(num);
    setCourseData(Array.from({ length: num }, () => ({ code: '', name: '' })));
  };

  const handleCourseCodeChange = (index, value) => {
    const newData = [...courseData];
    newData[index].code = value;
    setCourseData(newData);
  };

  const handleCourseNameChange = (index, value) => {
    const newData = [...courseData];
    newData[index].name = value;
    setCourseData(newData);
  };

  const toggleShortTermGoal = (goal) => {
    if (shortTermGoals.includes(goal)) {
      setShortTermGoals(shortTermGoals.filter(item => item !== goal));
    } else {
      setShortTermGoals([...shortTermGoals, goal]);
    }
  };

  const toggleLongTermGoal = (goal) => {
    if (longTermGoals.includes(goal)) {
      setLongTermGoals(longTermGoals.filter(item => item !== goal));
    } else {
      setLongTermGoals([...longTermGoals, goal]);
    }
  };

  const toggleAreaToImprove = (area) => {
    if (areasToImprove.includes(area)) {
      setAreasToImprove(areasToImprove.filter(item => item !== area));
    } else {
      setAreasToImprove([...areasToImprove, area]);
    }
  };

  const selectProfilePicture = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSubmit = () => {
    // Handle submission of profile data and course data
    console.log('Submitted Profile Data:', { firstName, lastName });
    console.log('Submitted Course Data:', courseData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      {/* First Name Input */}
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />

      {/* Last Name Input */}
      <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter your last name"
      />

      {/* Number of Classes Dropdown */}
      <Text>Number of Classes:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setNumClasses(value)}
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

      {/* Course Load Form */}
      {Array.from({ length: numClasses }).map((_, index) => (
        <View key={index}>
          <Text>Class {index + 1}</Text>
          <TextInput
            style={styles.input}
            value={courseData[index]?.code}
            onChangeText={(value) => handleCourseCodeChange(index, value)}
            placeholder="Course Code"
          />
          <TextInput
            style={styles.input}
            value={courseData[index]?.name}
            onChangeText={(value) => handleCourseNameChange(index, value)}
            placeholder="Course Name"
          />
        </View>
      ))}

      {/* Study Goals */}
      {/* Short-term Goals */}
      {/* Short-term Goals */}
      <Text>Short-term academic goals:</Text>
      {shortTermGoalsOptions.map((goal, index) => (
        <Button
          key={index}
          title={goal}
          onPress={() => toggleShortTermGoal(goal)}
          color={shortTermGoals.includes(goal) ? 'blue' : 'gray'}
        />
      ))}
      
      {/* Long-term Goals */}
      <Text>Long-term academic goals:</Text>
      {longTermGoalsOptions.map((goal, index) => (
        <Button
          key={index}
          title={goal}
          onPress={() => toggleLongTermGoal(goal)}
          color={longTermGoals.includes(goal) ? 'blue' : 'gray'}
        />
      ))}

      {/* Areas to Improve */}
      <Text>Areas to improve or focus on:</Text>
      {areasToImproveOptions.map((area, index) => (
        <Button
          key={index}
          title={area}
          onPress={() => toggleAreaToImprove(area)}
          color={areasToImprove.includes(area) ? 'blue' : 'gray'}
        />
      ))}




        {/* MISC */}
      {/* Personal Bio */}
      <Text>Personal Bio:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Write a brief bio about yourself"
        multiline
      />
      {/* Profile Picture */}
      <Text>Profile Picture:</Text>
      <View style={styles.profilePictureContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <Text>No profile picture selected</Text>
        )}
        <TouchableOpacity onPress={selectProfilePicture}>
          <Text style={styles.selectPictureButton}>Select Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreateProfile;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20 // Add padding bottom for spacing after the last element
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%'
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  selectPictureButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
