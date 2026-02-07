import { SessionsContext } from "@/app/(tabs)/workouts/sessionsContext";
import { deleteSessionById, Session } from "@/app/db/model/Session";
import { useContext, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, MD3Theme, Snackbar, Text, useTheme } from 'react-native-paper';

type Props = {
    session: Session;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DeleteSessionModal({session, modalVisible, setModalVisible}: Props) {
    
    const theme = useTheme();
    const styles = createStyles(theme);

    const loadSessions = useContext(SessionsContext);

    const [isDeletingSession, setIsDeletingSession] = useState<boolean>(false);
    const [isVisibleSnackBar, setIsVisibleSnackBar] = useState<boolean>(false);
    const [feedbackText, setFeedbackText] = useState<string>("");

    function closeModal() {
        setModalVisible(false);
    }

    async function deleteSession() {

        setIsDeletingSession(true);

        deleteSessionById(session.id)
        .then(() => loadSessions())
        .then(() => {
            setFeedbackText("Session deleted");
        })
        .catch((e) => {
          setFeedbackText("An error ocurred while deleting the session");
          console.log(e.message);
        })
        .finally(() => {
          setIsDeletingSession(false);
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
                        <Text variant='titleMedium'>You are about to delete the session {session.id}. Do you want to proceed?</Text>
                        <View style={styles.buttonsContainer}>
                            <Button mode='outlined' onPress={closeModal}>
                                Cancel
                            </Button>
                            <Button loading={isDeletingSession} mode='outlined' onPress={deleteSession}>
                                Delete
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Snackbar
                visible={isVisibleSnackBar}
                onDismiss={() => setModalVisible(false)}
                action={{
                    label: "close",
                    onPress: () => setModalVisible(false)
                }}
            >
                {feedbackText}
            </Snackbar>
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