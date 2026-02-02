import { ExercisesContext } from "@/app/(tabs)/workouts/exercisesContext";
import { deleteExerciseById, Exercise } from "@/app/db/model/Exercise";
import { useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Portal, Snackbar, Text } from 'react-native-paper';


type Props = {
    exercise: Exercise;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DeleteExerciseModal({exercise, modalVisible, setModalVisible}: Props) {

    const loadExercises = useContext(ExercisesContext);

    const [isDeletingExercise, setIsDeletingExercise] = useState<boolean>(false);
    const [isVisibleSnackBar, setIsVisibleSnackBar] = useState<boolean>(false);
    const [feedbackText, setFeedbackText] = useState<string>("");

    function closeModal() {
        setModalVisible(false);
    }

    async function deleteExercise() {

        setIsDeletingExercise(true);

        deleteExerciseById(exercise.id)
        .then(() => loadExercises())
        .then(() => {
            setFeedbackText("Exercise deleted");
        })
        .catch((e) => {
          setFeedbackText("An error ocurred while deleting the exercise");
          console.log(e.message);
        })
        .finally(() => {
          setIsDeletingExercise(false);
          setIsVisibleSnackBar(true);
          closeModal();
        })

    }

    return (
        <>
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
                            <Button loading={isDeletingExercise} mode='outlined' onPress={deleteExercise}>
                                Delete
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Portal>
                <Snackbar
                    visible={isVisibleSnackBar}
                    onDismiss={() => setIsVisibleSnackBar(false)}
                    action={{
                        label: "Close",
                        onPress: () => {
                            setIsVisibleSnackBar(false);
                        }
                    }}
                >
                    {feedbackText}
                </Snackbar>
            </Portal>
        </>
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