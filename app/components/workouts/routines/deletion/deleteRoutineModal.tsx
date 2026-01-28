import { deleteRoutineById, Routine } from "@/app/db/model/Routine";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type Props = {
    routine: Routine,
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DeleteSessionModal({routine, modalVisible, setModalVisible}: Props) {
    


    function closeModal() {
        setModalVisible(false);
    }

    async function deleteRoutine() {

        const deletedSessions = await deleteRoutineById(routine.id);

        console.log(`${deletedSessions} workout sessions have been removed`)

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
                        You are about to delete the routine {routine.name}. 
                        Every associated workout session will be also removed.
                        This action is not reversable.
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <Button mode='outlined' onPress={closeModal}>
                            Cancel
                        </Button>
                        <Button mode='outlined' onPress={deleteRoutine}>
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