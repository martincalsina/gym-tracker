import AddRoutineButton from "@/app/components/workouts/routines/addRoutineButton";
import RoutineCard from "@/app/components/workouts/routines/routineCard";
import { FlatList, StyleSheet, View } from "react-native";

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
        <>
            <View>
                <AddRoutineButton />
            </View>
            <FlatList
                style={styles.container}
                data={routines}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <RoutineCard routine={item} />
                )}
            />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
})