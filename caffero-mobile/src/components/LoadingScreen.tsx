import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';

export const LoadingScreen: React.FC = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/coffee-loading.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    animation: {
        width: 200,
        height: 200,
    },
}); 