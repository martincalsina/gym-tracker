import { Session } from "@/app/db/model/Session";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, MD3Theme, Modal, Portal, Text, useTheme } from "react-native-paper";
import DateFilter from "./dateFilter";


type Props= {
    sessions: Session[];
    setFilteredSessions: (arg: Session[]) => void;
    showModal: boolean;
    setShowModal: (arg: boolean) => void;
}

export default function FilterModal({sessions, setFilteredSessions, showModal, setShowModal}: Props) {

    const theme = useTheme();
    const styles = createStyles(theme);

    const [dateFilter, setDateFilter] = useState<(arg: Session[]) => Session[]>(() => (a: Session[]) => a);

    function hideModal() {
        setShowModal(false);
    }

    function onCancel() {
        setShowModal(false);
    } 

    function onApply() {

        let filteredSessions = sessions;

        filteredSessions = dateFilter(filteredSessions);

        // space for more filters smth smth

        setFilteredSessions(filteredSessions);

        hideModal();

    }

    return (
        <>
        <Portal>
            <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={styles.modalContentContainer}>

            
                <Text variant="titleLarge" style={{paddingBottom: 10}}>
                    Filters
                </Text>

                <DateFilter setFilter={setDateFilter}/>

                <Divider />
                
                <View style={styles.formButtonsContainer}>
                    <Button onPress={onCancel} style={styles.cancelButton} mode="outlined">
                        Cancel
                    </Button>
                    <Button onPress={onApply} style={styles.applyButton} mode="outlined">
                        Apply
                    </Button>
                </View>
            
            </Modal>
        </Portal>
        </>
    )

}

const createStyles = (theme: MD3Theme) => StyleSheet.create({
    modalContentContainer: {
        paddingVertical: 30,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        backgroundColor: theme.colors.surface,
    },
    formButtonsContainer: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    applyButton: {

    },
    cancelButton: {

    }
})