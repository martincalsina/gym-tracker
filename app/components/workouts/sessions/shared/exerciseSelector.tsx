import { Exercise } from "@/app/db/model/Exercise";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

type Props = {
    exercises: Exercise[];
    selectedExercise: number; //the exercise id in the DB
    setSelectedExercise: (arg: number) => void;
    addRealizedExercise: (arg: Exercise) => void;
}

export default function ExerciseSelector({exercises, selectedExercise, setSelectedExercise, addRealizedExercise}: Props) {

    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);

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

                    <Picker
                        mode="dropdown"
                        selectedValue={selectedExercise}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedExercise(itemValue);
                            addRealizedExercise(exercises.filter((ex) => ex.id == itemValue)[0]);
                            setAddExerciseModalVisible(false);
                        }
                        }>
                        {
                            exercises.map((ex: Exercise) => (
                                <Picker.Item label={ex.name} value={ex.id} />
                            ))
                        }
                    </Picker>

                </View>
            </Modal>
            
            <View style={styles.buttonContainer}>
                <Button icon="plus" mode="outlined" onPress={() => setAddExerciseModalVisible(true)}>
                                                add exercise
                </Button>
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
    },
    buttonContainer: {
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
})