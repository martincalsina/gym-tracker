import RoutineCard from "@/app/components/workouts/routineCard";
import { ScrollView, StyleSheet } from "react-native";

const routines: any[] = [
    {
        id: 1,
        name: "Push Pull Legs",
        image: "https://picsum.photos/700",
        note: "Some note on this routine",
    },
    {
        id: 2,
        name: "Full Body",
        image: "https://picsum.photos/700",
        note: "Some note on this routine"
    },
    {
        id: 3,
        name: "Upper-Lower",
        image: "https://picsum.photos/700",
        note: null,
    }
]

export default function Routines() {
    return (
        <ScrollView style={styles.container}>

            {
                routines.map((routine) => (
                    <RoutineCard routine={routine}/>
                ))
            }

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15
    },
})