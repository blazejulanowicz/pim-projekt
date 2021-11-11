import React from "react";
import { View, StyleSheet, } from 'react-native';
import Pulse from '../animations/Pulse'

const IndicationCircle = ({color, radius, maxOpacity, timeStart, timeEnd}) => {
    const styles = StyleSheet.create({
        circle: {
            width: radius,
            height: radius,
            backgroundColor: color,
            borderRadius: 100,
            margin: 5
        }
    });

    return (
        <Pulse maxOpacity={maxOpacity} timeStart={timeStart} timeEnd={timeEnd}>
            <View style={styles.circle}/>
        </Pulse>
    );
};

export default IndicationCircle;