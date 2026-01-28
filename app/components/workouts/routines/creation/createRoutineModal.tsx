import { createRoutine, CreateRoutineData, getRoutineById, Routine } from '@/app/db/model/Routine';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
    onAdd: ((arg: any) => void);
}

const DEFAULT_COVER: string = "https://picsum.photos/700";

export default function CreateRoutineModal({modalVisible, setModalVisible, onAdd}: Props) {


    const [routineName, setRoutineName] = useState("");
    const [routineDescription, setRoutineDescription] = useState("");
    const [cover, setCover] = useState<string>(DEFAULT_COVER);

    async function pickCover() {
      
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Permission to access the media library is required")
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      console.log(result);

      if (!result.canceled) {
        setCover(result.assets[0].uri);
      }

    }

    function closeModal() {
        setRoutineName("");
        setRoutineDescription("");
        setModalVisible(false);
    }

    async function saveRoutine() {
        let routine: CreateRoutineData = {
          name: routineName,
          description: routineDescription,
          cover: cover,
        };
        let newRoutineId: number = await createRoutine(routine);
        console.log(`New routine has id: ${newRoutineId}`);
        closeModal();
        let newRoutine: Routine | null = await getRoutineById(newRoutineId);
        onAdd(newRoutine);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text variant='titleMedium'>Create a new routine</Text>
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label="Name"
                                value={routineName}
                                onChangeText={text => setRoutineName(text)}
                            />
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                multiline={true}
                                numberOfLines={6}
                                mode='outlined'
                                label="Description"
                                value={routineDescription}
                                onChangeText={text => setRoutineDescription(text)}
                            />
                            <Button icon="camera" mode="contained" onPress={pickCover}>
                                    Add Cover
                            </Button>
                            <View style={styles.buttonsContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={closeModal}>
                                    <Text variant='titleSmall'>Close</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={saveRoutine}>
                                    <Text variant='titleSmall'>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  textArea: {
    minHeight: 100,
  },
});