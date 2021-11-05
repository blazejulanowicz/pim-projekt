import React from 'react';
import { View, TouchableOpacity, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {

    const textRecognized = ({textBlocks}) => {
        console.log(textBlocks)
    }

    return (
        <View style={styles.container}>
            <RNCamera style={styles.preview} captureAudio={false} onTextRecognized={textRecognized}/>
            <View>
                <TouchableOpacity style={styles.outerCapture}>
                    <View style={styles.innerCapture}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    outerCapture: {
      position: 'absolute',
      bottom: 10,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 100,
      padding: 5,
      paddingHorizontal: 5,
      alignSelf: 'center',
      margin: 20,
    },

    innerCapture: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderRadius: 100,
      alignSelf: 'center',
      width: 60,
      height: 60,
    }
  });

export default CameraScreen;