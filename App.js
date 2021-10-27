/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <TouchableOpacity
          style={styles.circleButton}>
          <Text style={styles.text}>SCAN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  circleButton: {
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'blue',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200
  },
  text: {
    fontSize: 50,
    fontWeight: '600',
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
