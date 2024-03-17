import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const CreateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [college, setCollege] = useState('');

  const collegeOptions = [
    { label: 'College A', value: 'college_a' },
    { label: 'College B', value: 'college_b' },
    // Add more colleges here
  ];

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      {/* Actual Log In Form */}
      <View>
        {/* General */}
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
        <Text>College</Text>
        <Text>Major</Text>
        <Text>Class Year</Text>
        <Text>Current Courses</Text>

        {/* Study Preferences */}
        <Text>Study Time Prefs</Text>
        <Text>Study Location Prefs</Text>
        <Text>Study Style Prefs (Individual, Group...)</Text>

        {/* Areas of interest */}
        <Text>Specific areas within their field of study they're passionate about</Text>

        {/* Study Goals */}
        <Text>Short-term and long-term academic goals</Text>
        <Text>Specific areas they want to improve in or focus on</Text>

        {/* Skills */}
        <Text>Academic strengths</Text>
        <Text>Subjects they feel confident in helping others with</Text>

        {/* MISC */}
        <Text>Personal Bio</Text>
        <Text>Profile Pic</Text>*/}
      </View>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
