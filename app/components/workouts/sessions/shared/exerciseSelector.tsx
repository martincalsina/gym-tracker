import { Exercise } from "@/app/db/model/Exercise";
import { imageRegistry } from "@/assets/images/exercises/imageRegistry";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { Card, IconButton, Searchbar, Text } from 'react-native-paper';

type Props = {
    exercises: Exercise[];
    addRealizedExercise: (arg: Exercise) => void;
}

export default function ExerciseSelector({exercises, addRealizedExercise}: Props) {

    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);

    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
    const [searchQuery, setSearchQuery] = useState<string>("");

    function resetExercises() {
        setFilteredExercises(exercises);
    }

    function searchExercises() {
        setFilteredExercises(exercises.filter(e => e.name.toLowerCase().includes(searchQuery.trim().toLowerCase())));
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={addExerciseModalVisible}
                onRequestClose={() => {
                    setAddExerciseModalVisible(!addExerciseModalVisible);
                }}>

                <View style={styles.modalContent}>

                    <Text variant='titleMedium'>Select an exercise</Text>

                    <Searchbar
                        style={styles.searchBar}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onClearIconPress={resetExercises}
                        onIconPress={searchExercises}
                        onSubmitEditing={searchExercises}
                        placeholder="Search"
                    />

                    <FlatList
                        data={filteredExercises}
                        keyExtractor={(ex) => ex.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => {

                            const exercise = item;
                            const coverSource = (exercise.cover.startsWith("file://") || exercise.cover.startsWith("content://")) ? { uri: exercise.cover }
                                : imageRegistry[exercise.cover];

                            return (
                                
                                    <Card style={styles.card}>
                                        <Pressable onPress={() => {
                                            addRealizedExercise(exercise);
                                            setAddExerciseModalVisible(false);
                                        }}>
                                            <Card.Content>
                                                <Text variant="titleSmall">{exercise.name}</Text>
                                            </Card.Content>
                                            <Card.Cover style={styles.cardImage} source={coverSource} />
                                        </Pressable>
                                    </Card>
                                
                            )
                        }}
                    />

                </View>
            </Modal>
            
            <View style={styles.buttonContainer}>
                <IconButton style={styles.button} icon="plus" mode="outlined" onPress={() => setAddExerciseModalVisible(true)}/>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    modalContent: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 'auto',
        flex: 1
    },
    searchBar: {
        marginVertical: 10
    },
    card: {
        width: '48%',
        padding: '1%',
        margin: '1%',
    },
    cardImage: {
        width: '100%',
        height: 160,
    },
    buttonContainer: {
        alignItems: 'flex-start',
    },
    button: {
        height: 100,
        width: 60,
        margin: 0,
        borderRadius: 0
    }
})