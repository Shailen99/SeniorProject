import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import icons from Expo vector icons
import maleStudent from '../../assets/maleStudent.jpg';
import femaleStudent from '../../assets/femaleStudent.jpg';

const otherStudentsData = [
  { id: 1, name: 'John Doe', major: 'Computer Science', imageUrl: maleStudent },
  { id: 2, name: 'Jane Smith', major: 'Physics', imageUrl: femaleStudent },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const navigateToMessages = () => {
    navigation.navigate('Messages');
  };

  const handleRefresh = () => {
    console.log('Refreshing...');
  };

  const handleRequestMatch = (studentId) => {
    console.log('Requested to match with student ID:', studentId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToNotifications}>
          <FontAwesome name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToMessages}>
          <FontAwesome name="envelope" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <FontAwesome name="user" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRefresh}>
          <FontAwesome name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profilesContainer}>
        <Text style={styles.profilesTitle}>Explore Other Students</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {otherStudentsData.map((student) => (
            <View key={student.id} style={styles.profileCard}>
              <Image source={student.imageUrl} style={styles.profileImage} />
              <Text>{student.name}</Text>
              <Text>{student.major}</Text>
              <TouchableOpacity onPress={() => handleRequestMatch(student.id)}>
                <Text style={styles.requestButton}>Request Match</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  profilesContainer: {
    alignItems: 'center',
  },
  profilesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  requestButton: {
    color: 'blue',
    marginTop: 5,
  },
});

export default HomeScreen;
