import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const Pulse = ({maxOpacity, timeStart, timeEnd, style, children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(
                fadeAnim,
                {
                toValue: maxOpacity,
                duration: timeStart,
                easing: Easing.back(),
                useNativeDriver: true,
                }
            ),
            Animated.timing(
                fadeAnim,
                {
                toValue: 0,
                duration: timeEnd,
                easing: Easing.back(),
                useNativeDriver: true,
                }
            ),  
    ])).start();
  }, [fadeAnim]);

  return (
    <Animated.View                 // Special animatable View
      style={{
        style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
};

export default Pulse;