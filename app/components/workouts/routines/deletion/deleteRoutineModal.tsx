import { RoutinesContext } from "@/app/(tabs)/workouts/routinesContext";
import { deleteRoutineById, Routine } from "@/app/db/model/Routine";
import { useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { MD3Theme } from "react-native-paper/lib/typescript/types";

type Props = {
    routine: Routine,
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DeleteRoutineModal({routine, modalVisible, setModalVisible}: Props) {
    
    const theme = useTheme();
    const styles = createStyles(theme);

    const loadRoutines = useContext(RoutinesContext);

    const [isDeletingRoutine, setIsDeletingRoutine] = useState<boolean>(false);
    const [isVisibleSnackBar, setIsVisibleSnackBar] = useState<boolean>(false);
    const [feedbackText, setFeedbackText] = useState<string>("");

    function closeModal() {
        setModalVisible(false);
    }

    async function deleteRoutine() {

        setIsDeletingRoutine(true);

        deleteRoutineById(routine.id)
        .then(() => loadRoutines())
        .then(() => {
            setFeedbackText("Routine deleted");
        })
        .catch((e) => {
          setFeedbackText("An error ocurred while deleting the routine");
          console.log(e.message);
        })
        .finally(() => {
          setIsDeletingRoutine(false);
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
                            You are about to delete the routine {routine.name}. 
                            Every associated workout session will be also removed.
                            This action is not reversable.
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <Button mode='outlined' onPress={closeModal}>
                                Cancel
                            </Button>
                            <Button loading={isDeletingRoutine} mode='outlined' onPress={deleteRoutine}>
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
                        onPress: () => setIsVisibleSnackBar(false)
                    }}
                >
                    {feedbackText}
                </Snackbar>
            </Portal>
        </>
    )
}

const createStyles = (theme: MD3Theme) => StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
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