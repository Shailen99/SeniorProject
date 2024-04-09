import { ScrollView, View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref,uploadBytes,uploadString,getDownloadURL } from "firebase/storage";
import { FIREBASE_DB } from '../../FirebaseConfig';
import { doc, setDoc,onSnapshot } from "firebase/firestore"; 

const CreateProfile = () => {
  const db = FIREBASE_DB;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numClasses, setNumClasses] = useState(1);
  const [courseData, setCourseData] = useState([{ code: '', name: '' }]);
  const [shortTermGoals, setShortTermGoals] = useState([]);
  const [longTermGoals, setLongTermGoals] = useState([]);
  const [areasToImprove, setAreasToImprove] = useState([]);
  const [bio, setBio] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const [gender, setGender] = useState('');
  const [major, setMajor] = useState('');
  const [yearPreference, setYearPreference] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [studyStyles, setStudyStyles] = useState([]);
  const [studyLocationPreferences, setStudyLocationPreferences] = useState([]);
  const [studyTimePreferences, setStudyTimePreferences] = useState([]);

  useEffect(() => {
    const uid = sessionStorage.getItem('uid')||'';
    const unsub = onSnapshot(doc(db, "profile", uid), (doc) => {
      debugger
      let data = doc.data();
      debugger
      setFirstName(data['firstName'])
      setLastName(data['lastName'])
      let num = parseInt(data['numClasses']);
       setNumClasses(num);
      setCourseData(data['courseData'])
      setShortTermGoals(data['shortTermGoals'])
      setLongTermGoals(data['longTermGoals'])
      setBio(data['bio'])
      setDownloadURL(data['downloadURL'])
      setProfilePicture(data['profilePicture'])
      setAreasToImprove(data['areasToImprove'])
  });
  
  }, []);


  // options for gender 
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  //options for year
  const yearOptions = [
    { label: '1st Year', value: '1' },
    { label: '2nd Year', value: '2' },
    { label: '3rd Year', value: '3' },
    { label: '4th Year', value: '4' },
    { label: 'Graduate', value: 'graduate' },
  ];

  //study style
  const studyStyleOptions = ['Visual', 'Auditory', 'Read/Write', 'Kinesthetic'];
  //locations
  const locationOptions = ['Library', 'Cafe', 'Class', 'Outdoors'];
  //times
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

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

  // new additions to toggle for new elements.
  const toggleStudyStyle = (style) => {
    if (studyStyles.includes(style)) {
      setStudyStyles(studyStyles.filter(item => item !== style));
    } else {
      setStudyStyles([...studyStyles, style]);
    }
  };
  
  const toggleStudyLocation = (location) => {
    if (studyLocationPreferences.includes(location)) {
      setStudyLocationPreferences(studyLocationPreferences.filter(item => item !== location));
    } else {
      setStudyLocationPreferences([...studyLocationPreferences, location]);
    }
  };
  
  const toggleStudyTime = (time) => {
    if (studyTimePreferences.includes(time)) {
      setStudyTimePreferences(studyTimePreferences.filter(item => item !== time));
    } else {
      setStudyTimePreferences([...studyTimePreferences, time]);
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
      uploadImageToFirebase(result.uri);
    }
  };

  const handleSubmit = () => {
    // Handle submission of profile data and course data
    console.log('Submitted Profile Data:', { firstName, lastName });
    console.log('Submitted Course Data:', courseData);
    // 使用示例
    let data = {
      firstName: firstName,
      lastName: lastName,
      downloadURL: downloadURL,
      numClasses: numClasses,
      courseData: courseData,
      shortTermGoals: shortTermGoals,
      longTermGoals: longTermGoals,
      areasToImprove: areasToImprove,
      bio: bio,
      profilePicture: profilePicture,
      // New fields added 
      gender: gender,
      major: major,
      yearPreference: yearPreference, 
      currentYear: currentYear, 
      studyStyles: studyStyles, 
      studyLocationPreferences: studyLocationPreferences, 
      studyTimePreferences: studyTimePreferences, 
    };
    console.log('Submitted all data:', data);
  
   
    saveDataToFirebase(data);
  };
  const saveDataToFirebase = async(data) => {
    const uid = sessionStorage.getItem('uid')||'';
     setDoc(doc(db, "profile", uid), data).then(res =>{
       alert("Profile Save Success!")
     }).catch(err=>{
      debugger
     });
  };

   const uploadImageToFirebase = (imageUri) => {
    const storage = getStorage();
    const fileName = Date.now() + '.png';
    const mountainImagesRef = ref(storage, 'images/'+fileName);
    const file = base64ToFile(imageUri,fileName);
    uploadBytes(mountainImagesRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        alert('ProfilePicture Upload Success!');
        setDownloadURL(downloadURL);
      });
    });
    //base64 to file
    function base64ToFile(base64Data, filename) {
      // base64
      let arr = base64Data.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
   
      while(n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }

      let blob = new Blob([u8arr], {type: mime});
      let file = new File([blob], filename, {type: mime});
   
      return file;
  }
    


   
    // const imageRef = storage.ref('images').child(fileName);
    // const response = await fetch(imageUri);
    // const blob = await response.blob();
    // await imageRef.put(blob);
    // return await imageRef.getDownloadURL();
  }

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

      {/* New additions to User profile */}

      {/* Gender Selection */}
      <Text>Gender:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={setGender}
        value={gender}
        items={genderOptions}
      />

      {/* Major Input */}
      <Text>Major:</Text>
      <TextInput
        style={styles.input}
        value={major}
        onChangeText={setMajor}
        placeholder="Enter your major"
      />

      {/* Current Year Selection */}
      <Text>Current Year:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={setCurrentYear}
        value={currentYear}
        items={yearOptions}
      />

      {/* Study Style Selection */}
<Text>Preferred Study Style:</Text>
{studyStyleOptions.map((style, index) => (
  <Button
    key={index}
    title={style}
    onPress={() => toggleStudyStyle(style)}
    color={studyStyles.includes(style) ? 'blue' : 'gray'}
  />
))}

{/* Study Location Preferences */}
<Text>Preferred Study Locations:</Text>
{locationOptions.map((location, index) => (
  <Button
    key={index}
    title={location}
    onPress={() => toggleStudyLocation(location)}
    color={studyLocationPreferences.includes(location) ? 'blue' : 'gray'}
  />
))}

{/* Study Time Preferences */}
<Text>Preferred Study Times:</Text>
{timeOptions.map((time, index) => (
  <Button
    key={index}
    title={time}
    onPress={() => toggleStudyTime(time)}
    color={studyTimePreferences.includes(time) ? 'blue' : 'gray'}
  />
))}

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
