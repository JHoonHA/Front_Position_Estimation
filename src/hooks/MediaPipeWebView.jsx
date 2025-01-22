// src/hooks/MediaPipeWebView.jsx
import React from 'react';
import { WebView } from 'react-native-webview';

const MediaPipeWebView = ({ onPoseDetected }) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
            <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils"></script>
        </head>
        <body>
            <script>
                const pose = new Pose({
                    locateFile: (file) => \`https://cdn.jsdelivr.net/npm/@mediapipe/pose/\${file}\`,
                });

                pose.setOptions({
                    modelComplexity: 1,
                    smoothLandmarks: true,
                    enableSegmentation: false,
                    smoothSegmentation: false,
                });

                pose.onResults((results) => {
                    window.ReactNativeWebView.postMessage(JSON.stringify(results.poseLandmarks));
                });

                const videoElement = document.createElement('video');
                const camera = new Camera(videoElement, {
                    onFrame: async () => {
                        await pose.send({ image: videoElement });
                    },
                    width: 1280,
                    height: 720,
                });
                camera.start();
            </script>
        </body>
        </html>
    `;

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            onMessage={(event) => {
                const poseData = JSON.parse(event.nativeEvent.data);
                onPoseDetected(poseData); // 부모 컴포넌트에 데이터 전달
            }}
        />
    );
};

export default MediaPipeWebView;
