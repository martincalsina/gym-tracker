import { SessionsContext } from "@/app/(tabs)/workouts/sessionsContext";
import { deleteSessionById, Session } from "@/app/db/model/Session";
import { useContext } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

type Props = {
    session: Session;
    deleteSessionModalVisible: boolean;
    setDeleteSessionModalVisible: (arg: boolean) => void;
}

export default function DeleteSessionModal({session, deleteSessionModalVisible, setDeleteSessionModalVisible}: Props) {
    
    const loadSessions = useContext(SessionsContext);

    function closeDeleteSessionModal() {
        setDeleteSessionModalVisible(false);
    }

    async function deleteSession() {

        const sessionsRemoved = await deleteSessionById(session.id);

        console.log(`${sessionsRemoved} workout sessions have been removed`)
        
        await loadSessions();

        closeDeleteSessionModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={deleteSessionModalVisible}
            onRequestClose={() => {
                setDeleteSessionModalVisible(!deleteSessionModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text variant='titleMedium'>You are about to delete the session {session.id}. Do you want to proceed?</Text>
                    <View style={styles.buttonsContainer}>
                        <Button mode='outlined' onPress={closeDeleteSessionModal}>
                            Cancel
                        </Button>
                        <Button mode='outlined' onPress={deleteSession}>
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