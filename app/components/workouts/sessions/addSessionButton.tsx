import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CreateSessionModal from "./creation/createSessionModal";

export default function addSessionButton({onAdd}: any) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <CreateSessionModal onAdd={onAdd} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <AntDesign name="plus" size={15} color="black" />
                </Pressable>
            </View>
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