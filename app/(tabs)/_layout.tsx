import { lightTheme as theme } from '@/utils/themes';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Layout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#6c757d',
                tabBarStyle: { paddingBottom: insets.bottom, height: 60 + insets.bottom, backgroundColor: theme.linearGradientBackground[0] },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'index') {
                        return <Ionicons name="home" size={size} color={color} />;
                    }
                    if (route.name === 'analysis') {
                        return <Ionicons name="pie-chart" size={size} color={color} />;
                    }
                    if (route.name === 'categories') {
                        return <Ionicons name="list" size={size} color={color} />;
                    }
                    if (route.name === 'budget') {
                        return <Ionicons name="calculator" size={size} color={color} />;
                    }
                    return null;
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="analysis" options={{ title: 'Analysis' }} />
            <Tabs.Screen name="budget" options={{ title: 'Budgets' }} />
            <Tabs.Screen name="categories" options={{ title: 'Categories' }} />
            {/* <Tabs.Screen name="preferences" options={{
                title: 'Preferences',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                ),
            }} /> */}
        </Tabs>
    )
}

export default Layout