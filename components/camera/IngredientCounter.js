import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, } from 'react-native';

const IngredientCounter = () => {

    return (
        <View style={styles.container}>
                <View style={styles.number}>
                    <Text style={{color: '#F4EBD0'}}>0</Text>
                </View>
                <Text style={{color: '#F4EBD0'}}>Detected ingredients</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D6AD60',
      borderRadius: 5,
      padding: 5,
      paddingHorizontal: 5,
    },
    number: {
      backgroundColor: '#B68D40',
      borderRadius: 5,
      padding: 2,
      paddingHorizontal: 8,
      marginRight: 8
    }
  });

export default IngredientCounter;