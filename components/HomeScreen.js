import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { firebase } from '@react-native-firebase/database';


const HomeScreen = ({ navigation }) => {
    const backgroundStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      };

      const startCamera = () => {
        firebase.app().database('https://enumber-recognizer-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref('users/blazej')
        .once('value')
        .then(snapshot =>
          alert('User data: ' + snapshot.val()));
        navigation.navigate('Camera');
      };

      return (
        <SafeAreaView style={backgroundStyle}>
          <View>
            <TouchableOpacity
              style={styles.circleButton}
              onPressOut={startCamera}>
              <Text style={styles.text}>SCAN</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    highlight: {
      fontWeight: '700',
    },
    circleButton: {
      borderColor: 'lightblue',
      borderWidth: 1,
      borderRadius: 100,
      backgroundColor: 'blue',
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height: 200
    },
    text: {
      fontSize: 50,
      fontWeight: '600',
      fontWeight: 'bold',
      letterSpacing: 2,
      color: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default HomeScreen;