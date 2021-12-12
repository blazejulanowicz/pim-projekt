import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import logo from '../logoerecognition.png'

const HomeScreen = ({ navigation }) => {

  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    firebase.app().database('https://enumber-recognizer-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('items/EN')
      .once('value')
      .then(snapshot => {
        setIngredientData(snapshot.val())
      })
  }, []);

  const backgroundStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed5c5e',
  };

  const startCamera = () => {
    navigation.navigate('Camera', {
      ingData: ingredientData
    });
  };

  const showAllIngredients = () => {
    let ingredients = [];
    Object.entries(ingredientData).forEach(([key, value]) => {
      value['key'] = key;
      ingredients.push(value);
    });
    console.log(ingredients)
    navigation.navigate('Ingredients', {ingredients: ingredients, title: 'Explore ingredients'});
  };

  return (
    <View style={backgroundStyle}>
      <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={logo} />
      <View>
        <TouchableOpacity
          style={styles.circleButton}
          onPressOut={startCamera}>
          <Text style={styles.text}>SCAN</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <Pressable style={styles.button} onPressOut={showAllIngredients}>
        <Text style={styles.exploreText}>Explore</Text>
      </Pressable>
      <View style={{ flexGrow: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#f8d643',
    backgroundColor: 'rgba(248, 214, 67, 0.3)',
    borderRadius: 30,
    borderWidth: 1,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    letterSpacing: 2,
    color: '#393e5e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
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
    height: 200,
    
  },
  text: {
    fontSize: 50,
    fontFamily: 'Montserrat-Black',
    letterSpacing: 2,
    color: '#393e5e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;