import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CamBox from './components/CamBox/CamBox';
import CamBoxTitle from './components/CamBoxTitle/CamBoxTitle';

const PEPresenter = () => {
    const [poseData, setPoseData] = useState(null);

    const handlePoseDetected = (data) => {
        setPoseData(data); // CamBox에서 전달받은 poseData 업데이트
    };
    return (
        <View style={styles.container}>
            <CamBoxTitle />
            <CamBox onPoseDetected={handlePoseDetected} />
            {poseData && (
                <View style={styles.overlay}>
                    <Text style={styles.text}>{JSON.stringify(poseData, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 40,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
});

export default PEPresenter;
