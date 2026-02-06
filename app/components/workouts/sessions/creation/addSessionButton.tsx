import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import CreateSessionModal from "./createSessionModal";

export default function addSessionButton() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <CreateSessionModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <IconButton
              onPress={() => setModalVisible(true)}
              icon="plus"
              mode="outlined"
            />
        </>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  button: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonOpen: {
    backgroundColor: '#b5b5b5ff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});