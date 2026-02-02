import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
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
                    ) 
                }}/>
        </Tabs>
    )
}