import React, { useEffect } from 'react';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {

    return (
        <RNCamera style={{ flex: 1 }} captureAudio={false}/>
    )
};

export default CameraScreen;