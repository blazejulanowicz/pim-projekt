import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import IndicationCircle from './IndicationCircle';

const FinishButton = ({onFinish}) => {

    const styles = StyleSheet.create({
        outerCapture: {
          borderColor: 'red',
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
          backgroundColor: 'lightgrey',
          color: 'black',
          borderRadius: 100,
          padding: 10,
          paddingHorizontal: 10,
          width: 100,
          textAlign: 'center',
          fontFamily: 'Montserrat-Regular'
        },
    
        container: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }
      });

    return (
        <View style={styles.container}>
            <IndicationCircle color='#8b0000' radius={5} maxOpacity={0.6} timeStart={2000} timeEnd={1000} />
            <IndicationCircle color='#8b0000' radius={10} maxOpacity={0.8} timeStart={1500} timeEnd={1500} />
            <IndicationCircle color='#8b0000' radius={20} maxOpacity={1} timeStart={1000} timeEnd={2000} />
            <TouchableOpacity style={styles.outerCapture} onPressOut={onFinish}>
                <Text style={styles.innerCapture}>FINISH</Text>
            </TouchableOpacity>
            <IndicationCircle color='#8b0000' radius={20} maxOpacity={1} timeStart={1000} timeEnd={2000} />
            <IndicationCircle color='#8b0000' radius={10} maxOpacity={0.8} timeStart={1500} timeEnd={1500} />
            <IndicationCircle color='#8b0000' radius={5} maxOpacity={0.6} timeStart={2000} timeEnd={1000} />
        </View>
    );
};

export default FinishButton;