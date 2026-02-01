import { ExercisesContext } from '@/app/(tabs)/workouts/exercisesContext';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


type Props = {
    title: string;
    defaultName?: string;
    defaultDescription?: string;
    defaultCover?: string;
    onSave: (name: string, description: string, cover: string) => Promise<any>; //function that only saves the create/edit to DB
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
    
}

const DEFAULT_COVER: string = "@/assets/images/noun-squat.png";

export default function EditExerciseModal({title, defaultName, defaultDescription, defaultCover, onSave,modalVisible, setModalVisible}: Props) {

    const loadExercises = useContext(ExercisesContext);

    const [isSavingExercise, setIsSvaingExercise] = useState<boolean>(false);

    const [exerciseName, setExerciseName] = useState<string>(defaultName || "");
    const [exerciseDescription, setExerciseDescription] = useState<string>(defaultDescription || "");
    const [cover, setCover] = useState<string>(defaultCover || DEFAULT_COVER);

    async function pickCover() {
      
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Permission to access the media library is required")
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1
      })

      console.log(result);

      if (!result.canceled) {
        setCover(result.assets[0].uri);
      }

    }

    function closeModal() {
        setModalVisible(false);
    }

    function restoreValues() {
        setExerciseName(defaultName || "");
        setExerciseDescription(defaultDescription || "");
        setCover(defaultCover || DEFAULT_COVER);
    }

    function discardChanges() {
        restoreValues();
        closeModal();
    }

    async function saveExercise() {

        setIsSvaingExercise(true);

        await onSave(exerciseName, exerciseDescription, cover);
        await loadExercises()

        setIsSvaingExercise(false);

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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text variant='titleMedium'>{title}</Text>
                        <TextInput
                            style={styles.input}
                            mode='outlined'
                            label="Name"
                            value={exerciseName}
                            onChangeText={text => setExerciseName(text)}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            multiline={true}
                            numberOfLines={6}
                            mode='outlined'
                            label="Description"
                            value={exerciseDescription}
                            onChangeText={text => setExerciseDescription(text)}
                        />
                        <Button icon="camera" mode="contained" onPress={pickCover}>
                            Add Cover
                        </Button>
                        <View style={styles.buttonsContainer}>
                            <Button onPress={discardChanges}>
                                Close
                            </Button>
                            <Button onPress={saveExercise} loading={isSavingExercise}>
                                {isSavingExercise ? "    " : "Save"}
                            </Button>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
