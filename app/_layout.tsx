import { useTransactions } from '@/hooks/useTransactions';
import { storageUtils } from '@/utils/storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import DrawerContent from './components/DrawerContent';
import LockScreen from './components/LockScreen';

const Drawer = createDrawerNavigator();

function TabsStack() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="preferences" options={{ headerShown: false }} />
            <Stack.Screen name="exportRecord" options={{ headerShown: false }} />
            <Stack.Screen name="backup" options={{ headerShown: false }} />
            <Stack.Screen name="restore" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    const { hapusSemua } = useTransactions();
    const router = useRouter();

    const [pinAsli, setPin] = React.useState("");
    const [isUnlocked, setIsUnlocked] = React.useState(true);

    useEffect(() => {
        (async () => {
            setPin(await storageUtils.dapatinPin());
            setIsUnlocked(pinAsli !== "");
        })();
    }, []);


    // Handler for resetting expenses
    const handleResetExpenses = () => {
        Alert.alert('Reset Expenses', 'This will clear all your expenses. Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Reset', style: 'destructive', onPress: () => {
                hapusSemua();
            } },
        ]);
    };

    if (!isUnlocked && pinAsli !== "") {
        return <LockScreen pinAsli={pinAsli} onUnlock={() => setIsUnlocked(true)} />;
    }

    return (
        <Drawer.Navigator
            initialRouteName="TabsStack"
            drawerContent={(props) => (
                <DrawerContent
                    {...props}
                    router={router}
                    onResetExpenses={handleResetExpenses}
                />
            )}
            screenOptions={{ headerShown: false, drawerType: 'front' }}
        >
            <Drawer.Screen name="TabsStack" component={TabsStack} options={{ title: 'Home' }} />
        </Drawer.Navigator>
    );
}
