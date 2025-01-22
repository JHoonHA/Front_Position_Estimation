import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CamBoxTitle = () => {
    return (
        <View style={styles.camboxtitle_container}>
            <Text style={styles.text}>Position Estimation</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    camboxtitle_container: {
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 2,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CamBoxTitle;
