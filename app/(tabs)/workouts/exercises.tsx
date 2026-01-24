import AddExerciseButton from "@/app/components/workouts/exercises/addExerciseButton";
import ExerciseCard from "@/app/components/workouts/exercises/exerciseCard";
import { Exercise, getAllExercises } from '@/app/db/model/Exercise';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";


export default function Exercises() {

    const [exercises, setExercises] = useState<Exercise[]>([]); 

    function addExercise(newExercise: Exercise) {
        setExercises([...exercises, newExercise]);
    }

    useEffect(() => {

        async function loadExercises() {
            let data: Exercise[] = await getAllExercises();
            setExercises(data);
        }

        loadExercises();

    });

    return (
        <>
        <View>
            <AddExerciseButton onAdd={addExercise}/>
        </View>
        <FlatList
            style={styles.container}
            data={exercises}
            keyExtractor={(ex) => ex.id!.toString()}
            numColumns={2}
            renderItem={({item}) => (
                <ExerciseCard exercise={item}/>
        )}
        />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});