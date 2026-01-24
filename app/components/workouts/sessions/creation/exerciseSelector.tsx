import { Exercise } from "@/app/db/Exercise";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal } from "react-native";
import { Button, Text } from 'react-native-paper';

type Props = {
    exercises: Exercise[];
    selectedExercise: number;
    setSelectedExercise: (arg: number) => void;
    addRealizedExercise: (arg: Exercise) => void;
}

export default function ExerciseSelector({exercises, selectedExercise, setSelectedExercise, addRealizedExercise}: Props) {

    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addExerciseModalVisible}
                onRequestClose={() => {
                    setAddExerciseModalVisible(!addExerciseModalVisible);
                }}>
                <Text variant='titleSmall'>Select an exercise</Text>

                <Picker
                    selectedValue={selectedExercise}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedExercise(itemValue);
                        addRealizedExercise({
                            id: itemValue, //this is the only thing that really matters when adding the exercise
                            name: "placeholder",
                            description: "",
                            cover: "",
                        });
                        setAddExerciseModalVisible(false);
                    }
                    }>
                    {
                        exercises.map((ex: Exercise) => (
                            <Picker.Item label={ex.name} value={ex.id} />
                        ))
                    }
                </Picker>

            </Modal>

            <Button icon="plus" mode="contained" onPress={() => setAddExerciseModalVisible(true)}>
                                            add exercise
            </Button>
        </>
    )

}