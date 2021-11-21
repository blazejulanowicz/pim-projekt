import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';


const NewIngredient = ({item}) => {
    return (
        <Animated.View style={{alignSelf: 'center'}}>
            <Text style={{fontSize: 40}}>+ {item.key}</Text>
        </Animated.View>
    );
};

export default NewIngredient;