import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';
import FinishButton from './camera/FinishButton';
import NewIngredientList from './camera/NewIngredientList';

const CameraScreen = ({ navigation, route }) => {

    const [detectedIngredients, setDetectedIngredients] = useState([])
    const definedIngredients = [{name: 'E460'}, {name: 'E440'}, {name: 'E421'}, {name: 'E330'}, {name: 'E300'}]
    const defIngredientsNames = definedIngredients.map(el => el.name);

    const textRecognized = ({textBlocks}) => {
        if(textBlocks.length !== 0) {
            textBlocks.forEach(text => {
                let enumbers = text.value.match(/E\d{3}/g);
                if(enumbers !== null) {
                    let se = new Set(enumbers);
                    [...se].forEach(enumber => {
                        if(defIngredientsNames.includes(enumber) && !detectedIngredients.map(el => el.name).includes(enumber)) {
                            setDetectedIngredients((prevState) => [...prevState,{name: enumber}])   
                        } 
                    });
                }      
            });
        }
    };

    const showDetected = () => {
        alert(detectedIngredients.map(el => el.name))
    };

    return (
        <View style={styles.container}>
            <View style={styles.counter}>
                <IngredientCounter detectedIngredients={detectedIngredients.length}/>
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