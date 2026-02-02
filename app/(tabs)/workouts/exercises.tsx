import AddExerciseButton from "@/app/components/workouts/exercises/creation/addExerciseButton";
import ExerciseCard from "@/app/components/workouts/exercises/exerciseCard";
import { Exercise, getAllExercises } from '@/app/db/model/Exercise';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { ExercisesContext } from "./exercisesContext";


export default function Exercises() {

    const [exercises, setExercises] = useState<Exercise[]>([]); 
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");


    function resetExercises() {
        setFilteredExercises(exercises)
    }

    function searchExercises() {
        setFilteredExercises(exercises.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase().trim())))
    }

    async function loadExercises() {

        setIsFetchingData(true);

        const data: Exercise[] = await getAllExercises();
        setExercises(data);
        setFilteredExercises(data);

        setIsFetchingData(false);

    }

    useEffect(() => {

        loadExercises();

    }, []);

    return (
        <>
        <ExercisesContext value={loadExercises}>
            <AddExerciseButton/>
            <View style={styles.container}>
                <Searchbar 
                            style={styles.searchBar}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onClearIconPress={resetExercises}
                            onIconPress={searchExercises}
                            onSubmitEditing={searchExercises}
                            placeholder="Search"
                        />
                {isFetchingData && <ActivityIndicator style={styles.loadingIcon} size="large" animating={isFetchingData}/>}
                <FlatList
                    data={filteredExercises}
                    keyExtractor={(ex) => ex.id!.toString()}
                    numColumns={2}
                    renderItem={({item}) => (
                        <ExerciseCard exercise={item}/>
                )}
                />
            </View>
        </ExercisesContext>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1
    },
    searchBar: {
        marginVertical: 10
    },
    loadingIcon: {
        marginTop: 40
    }
});