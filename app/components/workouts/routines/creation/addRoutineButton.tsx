import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CreateRoutineModal from './createRoutineModal';

export default function addRoutineButton({onAdd}: any) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <CreateRoutineModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={styles.buttonContainer}>
                <IconButton
                  icon="plus"
                  onPress={() => setModalVisible(true)}
                  mode="contained"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'box-none',
  },
});