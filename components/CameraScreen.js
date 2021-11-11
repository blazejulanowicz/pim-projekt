import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';
import FinishButton from './camera/FinishButton';
import NewIngredientList from './camera/NewIngredientList';

const CameraScreen = ({ navigation }) => {

    const [detectedIngredients, setDetectedIngredients] = useState([])

    const textRecognized = ({textBlocks}) => {
        if(textBlocks.length !== 0) {
            textBlocks.forEach(text => {
                if(!detectedIngredients.map(el => el.name).includes(text.value.toLowerCase())) {
                    setDetectedIngredients((prevState) => [...prevState,{name: text.value.toLowerCase()}])   
                }       
            });
        }
    };

    const showDetected = () => {
        setDetectedIngredients([...detectedIngredients, {name: detectedIngredients.length.toString()}]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.counter}>
                <IngredientCounter/>
                <NewIngredientList detectedItems={[...detectedIngredients]} />
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
      zIndex: 999
    }
  });

export default CameraScreen;