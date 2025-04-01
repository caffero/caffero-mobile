import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export const SplashScreen: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/coffee-maker-logo.json')}
                autoPlay
                loop={false}
                style={styles.animation}
            />
            <Animated.Text style={[styles.companyName, { opacity: fadeAnim }]}>
                Caffero
            </Animated.Text>
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
    companyName: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4A2C2A', // Coffee brown color
    },
}); 