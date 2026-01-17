import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{title: "Home", tabBarLabel: 'Home'}}/>
            <Tabs.Screen name="workouts" options={{title: "Workouts", tabBarLabel: 'Workouts'}}/>
            <Tabs.Screen name="progress" options={{title: "Progress", tabBarLabel: 'Progress'}}/>
        </Tabs>
    )
}