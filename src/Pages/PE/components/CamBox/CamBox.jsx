import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const CamBox = ({ onPoseDetected }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef(null);
    const [isDetecting, setIsDetecting] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const processFrame = async () => {
            if (!cameraReady || !isMounted || !isDetecting) return;

            if (cameraRef.current) {
                const picture = await cameraRef.current.takePictureAsync({
                    skipProcessing: true,
                });
                await analyzePose(picture.uri);
            }

            requestAnimationFrame(processFrame); // 다음 프레임 실행
        };

        processFrame();

        return () => {
            isMounted = false;
        };
    }, [cameraReady, isDetecting]);

    const analyzePose = async (imageUri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            if (data.status) {
                onPoseDetected(data); // 자세 분석 결과 컴포넌트로 전달
            }
        } catch (error) {
            console.error('Error analyzing pose:', error);
        }
    };

    const toggleDetection = () => {
        setIsDetecting((prev) => !prev);
    };

    if (hasPermission === null) {
        console.log("허가")
        // return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* <Camera
                ref={cameraRef}
                style={styles.camera}
                // type={CameraType.back}
                onCameraReady={() => setCameraReady(true)}
            /> */}
            {/* <Camera
                ref={cameraRef}
                style={styles.camera}
                type="back"
                onCameraReady={() => setCameraReady(true)}
            /> */}
            <Button title={isDetecting ? "Stop Detection" : "Start Detection"} onPress={toggleDetection} />
            <Text style={styles.status}>
                {isDetecting ? "Detecting..." : "Detection Stopped"}
            </Text>
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
    status: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        color: 'white',
        fontSize: 20,
    },
});

export default CamBox;
