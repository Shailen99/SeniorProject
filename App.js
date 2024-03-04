import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>StudyPartners</Text>
      <Button variant="contained">Log In</Button>
      <Button variant="outlined">Register</Button>
      <StatusBar style="auto" />
    </View>
  );
}

<UserAuthContextProvider>
           My App
</UserAuthContextProvider>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
