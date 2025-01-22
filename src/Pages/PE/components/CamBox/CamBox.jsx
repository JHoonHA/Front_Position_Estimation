import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as poseDetection from '@tensorflow-models/pose-detection';

const CamBox = ({ onPoseDetected }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            await tf.ready(); // TensorFlow.js 초기화
        })();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const runPoseDetection = async () => {
            if (!cameraReady || !isMounted) return;

            const detectorConfig = {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            };
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

            const processFrame = async () => {
                if (!isMounted || !cameraRef.current) return;

                try {
                    const cameraImage = await cameraRef.current.takePictureAsync({
                        skipProcessing: true,
                    });

                    const imageTensor = tf.browser.fromPixels(cameraImage);
                    const poses = await detector.estimatePoses(imageTensor);

                    onPoseDetected(poses);
                } catch (error) {
                    console.error('Error processing frame:', error);
                }

                requestAnimationFrame(processFrame); // 다음 프레임 실행
            };

            processFrame();
        };

        runPoseDetection();

        return () => {
            isMounted = false;
        };
    }, [cameraReady, onPoseDetected]);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={CameraType.back}
                onCameraReady={() => setCameraReady(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});

export default CamBox;
