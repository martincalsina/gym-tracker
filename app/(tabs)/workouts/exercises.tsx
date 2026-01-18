import ExerciseCard from "@/app/components/exercises/exerciseCard";
import { FlatList, StyleSheet } from "react-native";

const exercises: any[] = [
    {
        id: 1,
        name: "Squat",
        image: "https://picsum.photos/700",
    },
    {
        id: 2,
        name: "Deadlift",
        image: "https://picsum.photos/700",
    },
    {
        id: 3,
        name: "Pull Up",
        image: "https://picsum.photos/700",
    },
    {
        id: 4,
        name: "Bench Press",
        image: "https://picsum.photos/700",
    },
    {
        id: 5,
        name: "Rows",
        image: "https://picsum.photos/700",
    },
    {
        id: 6,
        name: "Overhead Press",
        image: "https://picsum.photos/700",
    },
    {
        id: 7,
        name: "Seated Leg Curl",
        image: "https://picsum.photos/700",
    }
];

export default function Exercises() {
    return (
        <FlatList
            style={styles.container}
            data={exercises}
            keyExtractor={(ex) => ex.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
                <ExerciseCard exercise={item}/>
        )}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});