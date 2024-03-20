import {View, Text,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Home = () =>
{
  const navigation = useNavigation();
  const createProfile = () =>{
    console.log('createProfile')
    navigation.navigate('CreateProfile');
  };

  return(
    <View>
      <Text>Logged In!</Text>
      <TouchableOpacity style={[styles.button, styles.loginButtonOutline]} onPress={() => createProfile()}>
        <Text style={styles.buttonText}>Create Profile</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Home;
const styles = StyleSheet.create({
  buttonText: {
    color: '#219ebc',
    fontWeight: 'bold',
  },
  loginButtonOutline: {
    borderWidth: 1,
    borderColor: '#219ebc',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginLeft:50,
    marginRight:50,
    borderRadius: 5,
  },


});
