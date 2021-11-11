import React, { useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';
import FinishButton from './camera/FinishButton';

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
            <View style={styles.floatingMenu}>
                <FinishButton onFinish={showDetected} />
            </View>
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
    floatingMenu: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: 20,
    }
  });

export default CameraScreen;