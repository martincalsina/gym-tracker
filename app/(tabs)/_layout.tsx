import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import { useTheme } from 'react-native-paper';

export default function TabLayout() {

    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.elevation.level2,
                },
                headerTintColor: theme.colors.onSurface,
                tabBarStyle: {
                    backgroundColor: theme.colors.elevation.level2,
                    borderTopColor: theme.colors.outline,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
            }}
        >
            <Tabs.Screen 
                name="home" 
                options={{
                    title: "Home", 
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}/>
            <Tabs.Screen 
                name="workouts" 
                options={{
                    title: "Workouts", 
                    tabBarLabel: 'Workouts',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'barbell-sharp' : 'barbell-outline'} color={color} size={24} />
                    ),
                }}/>
            <Tabs.Screen 
                name="progress" 
                options={{
                    title: "Progress", 
                    tabBarLabel: 'Progress',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'analytics-sharp' : 'analytics-outline'} color={color} size={24}/>
                    ),

                }}/>
        </Tabs>
    )
}
