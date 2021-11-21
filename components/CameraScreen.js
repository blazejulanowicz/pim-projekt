import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IngredientCounter from './camera/IngredientCounter';
import FinishButton from './camera/FinishButton';
import NewIngredientList from './camera/NewIngredientList';
import { Header, Icon } from 'react-native-elements';
import logo from '../logoerecognition.png'

const CameraScreen = ({ navigation, route }) => {

    const [detectedIngredients, setDetectedIngredients] = useState([])
    const definedIngredients = {"E100": {"name": "Curcumin", "description": "Naturally occurring orange/yellow colour, extracted from the spice turmeric"}, "E101": {"name": "Riboflavin or lactoflavin", "description": "Naturally occurring B group vitamin usually obtained from yeast or produced synthetically."}, "E102": {"name": "Tartrazine", "description": "Widely used yellow/orange colour"}, "E104": {"name": "Quinoline Yellow", "description": "A synthetic coal tar dye, greenish yellow in colour"}, "E110": {"name": "Sunset Yellow", "description": "A synthetic coal tar dye, yellow in colour, used with E102"}, "E120": {"name": "Cochineal", "description": "Natural red colour obtained from egg yolk and dried insects. Can be manufactured"}, "E122": {"name": "Carmoisine", "description": "A synthetic coal tar dye, red/purple in colour"}, "E123": {"name": "Amaranth", "description": "A synthetic coal tar dye, red in colour"}, "E124": {"name": "Ponceau 4R", "description": "A synthetic coal tar dye, red in colour"}, "E127": {"name": "Erythrosine", "description": "A synthetic coal tar dye, red in colour, rich in mineral iodine."}, "E128": {"name": "Red 2G", "description": "A synthetic coal tar dye, red in colour."}, "E129": {"name": "Allura Red AC", "description": "Colouring agent"}, "E131": {"name": "Patent Blue V", "description": "Colouring agent"}}
    const defIngredientsNames = Object.keys(definedIngredients);

    const textRecognized = ({textBlocks}) => {
        if(textBlocks.length !== 0) {
            textBlocks.forEach(text => {
                let enumbers = text.value.match(/E\d{3}/g);
                if(enumbers !== null) {
                    let se = new Set(enumbers);
                    [...se].forEach(enumber => {
                        if(defIngredientsNames.includes(enumber) && !detectedIngredients.map(l => l.key).includes(enumber)) {
                            setDetectedIngredients((prevState) => {
                                const details = definedIngredients[enumber];
                                return [...prevState, {key: enumber, ...details}]
                            })   
                        } 
                    });
                }      
            });
        }
    };

    const showDetected = () => {
        alert(defIngredientsNames);
        navigation.navigate('Ingredients', {ingredients: detectedIngredients});
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