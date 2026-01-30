import { ExercisesContext } from "@/app/(tabs)/workouts/exercisesContext";
import { deleteExerciseById, Exercise } from "@/app/db/model/Exercise";
import { useContext } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';


type Props = {
    exercise: Exercise;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DeleteExerciseModal({exercise, modalVisible, setModalVisible}: Props) {

    const loadExercises = useContext(ExercisesContext);

    function closeModal() {
        setModalVisible(false);
    }

    async function deleteExercise() {

        await deleteExerciseById(exercise.id);
        await loadExercises();
        closeModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text variant='titleMedium'>
                        You are about to delete the exercise {exercise.name}. 
                        Every associated realized exercise from any workout session will be also removed.
                        This action is not reversable.
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <Button mode='outlined' onPress={closeModal}>
                            Cancel
                        </Button>
                        <Button mode='outlined' onPress={deleteExercise}>
                            Delete
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
})