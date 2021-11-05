import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';

const CameraScreen = ({ navigation }) => {

    const [detectedIngredients, setDetectedIngredients] = useState(new Set())

    const textRecognized = ({textBlocks}) => {
        if(textBlocks.length !== 0) {
            let currentState = detectedIngredients;
            textBlocks.forEach(text => {
                currentState.add(text.value.toLowerCase())          
            });
            setDetectedIngredients(detectedIngredients);
        }
    };

    const showDetected = () => {
        alert([...detectedIngredients].join(', '));
    }

    return (
        <View style={styles.container}>
            <View style={styles.counter}>
                <IngredientCounter/>
            </View>
            <RNCamera style={styles.preview} captureAudio={false} onTextRecognized={textRecognized}/>
            <TouchableOpacity style={styles.outerCapture} onPressOut={showDetected}>
                <Text style={styles.innerCapture}>FINISH</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    counter: {
        position: 'absolute',
        zIndex: 100,
        alignSelf: 'center',
        top: 10
    },
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
      bottom: 20,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 100,
      padding: 5,
      paddingHorizontal: 5,
      alignSelf: 'center',
      margin: 20,
    },

    innerCapture: {
      alignSelf: 'center',
      fontSize: 20,
      backgroundColor: 'lightgreen',
      color: 'black',
      borderRadius: 100,
      padding: 10,
      paddingHorizontal: 10,
      width: 150,
      textAlign: 'center'
    }
  });

export default CameraScreen;