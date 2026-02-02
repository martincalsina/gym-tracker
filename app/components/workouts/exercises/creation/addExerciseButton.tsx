import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CreateExerciseModal from './createExerciseModal';

export default function addExerciseButton() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <CreateExerciseModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={styles.buttonContainer}>

                <IconButton
                  icon="plus"
                  onPress={() => setModalVisible(true)}
                  mode='contained'
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 'auto',
    width: "100%",
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'box-none',
  },

});