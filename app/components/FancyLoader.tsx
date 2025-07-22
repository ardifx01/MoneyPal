import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const DOTS = 8;
const RADIUS = 18;
const DOT_SIZE = 10;
const colors = ['#007bff', '#00c6ff', '#007bff', '#00e1ff', '#007bff', '#00c6ff', '#007bff', '#00e1ff'];

export default function FancyLoader() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const dots = [];
    for (let i = 0; i < DOTS; i++) {
        const angle = (2 * Math.PI * i) / DOTS;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        dots.push(
            <Animated.View
                key={i}
                style={[
                    styles.dot,
                    {
                        backgroundColor: colors[i % colors.length],
                        left: 24 + x,
                        top: 24 + y,
                        opacity: 0.5 + 0.5 * (i / DOTS),
                    },
                ]}
            />
        );
    }

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.centerWrapper}>
            <View style={styles.container}>
                <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]}>
                    {dots}
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 48,
        height: 48,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        shadowColor: '#007bff',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
}); 