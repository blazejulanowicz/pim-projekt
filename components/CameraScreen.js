import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';
import FinishButton from './camera/FinishButton';
import NewIngredientList from './camera/NewIngredientList';
import { Header, Icon } from 'react-native-elements';
import logo from '../logoerecognition.png'

const CameraScreen = ({ navigation, route }) => {

    const detectedIngredients = useRef([]);
    const [readyIngredients, setReadyIngredients] = useState([]);
    const definedIngredients = route.params.ingData;
    const defIngredientsNames = Object.keys(definedIngredients);

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
      
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        useEffect(() => {
          const tick = () => {
            savedCallback.current();
          };
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    useInterval(() => {
        checkIngredients();
    }, 1000);

    const checkIngredients = () => {
        let unique = new Set(detectedIngredients.current);
        unique.forEach((item) => {
            const repeats = getIndexCount(detectedIngredients.current, item)
                if(repeats >= 3) {
                    setReadyIngredients((prevState) => {
                        if(prevState.map(l => l.key.toLowerCase()).includes(item))
                            return prevState;
                        const details = definedIngredients[item];
                        return [...prevState, {key: item.toUpperCase(), ...details}] 
                    });  
                }
        });
    };

    const getIndexCount = (arr, val) => {
        var indexes = 0, i;
        for(i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes++;
        return indexes;
    }

    const textRecognized = ({textBlocks}) => {
        if(textBlocks.length !== 0) {
            textBlocks.forEach(text => {
                let enumbers = text.value.match(/E\d{3,4}/g);
                if(enumbers !== null) {
                    let se = new Set(enumbers);
                    [...se].forEach(item => {
                        let enumber = item.toLowerCase();
                        if(defIngredientsNames.includes(enumber)) {
                            detectedIngredients.current.push(enumber);
                        } 
                    });
                }      
            });
        }
    };

    const showDetected = () => {
        navigation.navigate('Ingredients', {ingredients: readyIngredients, title: 'Detected ingredients'});
    };

    const onReturn = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{backgroundColor: '#ed5c5e', height: 90}}
                leftComponent={<Icon name='angle-left' type='font-awesome-5' onPress={onReturn} size={30} color='#393e5e'/>}
                centerComponent={<Image style={{flex: 1, width: 150, height: 150, resizeMode: 'contain'}} source={logo} />}
            />
            <View style={styles.counter}>
                <IngredientCounter detectedIngredients={readyIngredients.length}/>
                <NewIngredientList detectedItems={[...readyIngredients]} />
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
        top: 100
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