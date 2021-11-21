import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import logo from '../logoerecognition.png'

const HomeScreen = ({ navigation }) => {
    const backgroundStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ed5c5e'
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
        <View style={backgroundStyle}>
          <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={logo} />
          <View>
            <TouchableOpacity
              style={styles.circleButton}
              onPressOut={startCamera}>
              <Text style={styles.text}>SCAN</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexGrow: 1}}></View>
        </View>
      );
};

const styles = StyleSheet.create({
    highlight: {
      fontWeight: '700',
    },
    circleButton: {
      borderColor: 'yellow',
      borderWidth: 1,
      borderRadius: 100,
      backgroundColor: '#f8d643',
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
      color: '#393e5e',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default HomeScreen;