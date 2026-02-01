import AddExerciseButton from "@/app/components/workouts/exercises/creation/addExerciseButton";
import ExerciseCard from "@/app/components/workouts/exercises/exerciseCard";
import { Exercise, getAllExercises } from '@/app/db/model/Exercise';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ExercisesContext } from "./exercisesContext";


export default function Exercises() {

    const [exercises, setExercises] = useState<Exercise[]>([]); 
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    function addExercise(newExercise: Exercise) {
        setExercises([...exercises, newExercise]);
    }

    async function loadExercises() {

        setIsFetchingData(true);

        const data: Exercise[] = await getAllExercises();
        setExercises(data);

        setIsFetchingData(false);

    }

    useEffect(() => {

        loadExercises();

    }, []);

    return (
        <>
        <ExercisesContext value={loadExercises}>
            <View>
                <AddExerciseButton onAdd={addExercise}/>
            </View>
            {isFetchingData && <ActivityIndicator size="large" animating={isFetchingData}/>}
            <FlatList
                style={styles.container}
                data={exercises}
                keyExtractor={(ex) => ex.id!.toString()}
                numColumns={2}
                renderItem={({item}) => (
                    <ExerciseCard exercise={item}/>
            )}
            />
        </ExercisesContext>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});