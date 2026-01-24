import { Exercise, getAllExercises } from '@/app/db/Exercise';
import { RealizedExercise } from '@/app/db/RealizedExercise';
import { getAllRoutines, Routine } from '@/app/db/Routine';
import { createSession, Session } from '@/app/db/Session';
import { WorkingSet } from '@/app/db/WorkingSet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


type Props = {
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
    onAdd: ((arg: any) => void);
}

const DEFAULT_COVER: string = "https://picsum.photos/700";

export default function CreateSessionModal({modalVisible, setModalVisible, onAdd}: Props) {

    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);

    const [routines, setRoutines] = useState<Routine[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [sessionDate, setSessionDate] = useState(new Date(Date.now()));
    const [sessionDateShow, setSessionDateShow] = useState<boolean>(false);
    const [selectedRoutine, setSelectedRoutine] = useState();
    const [selectedExercise, setSelectedExercise] = useState<Exercise>();
    const [realizedExercises, setRealizedExercises] = useState<RealizedExercise[]>([]);

  useEffect(() => {
    
    async function load() {
      const [routinesData, exercisesData] = await Promise.all([
        getAllRoutines(),
        getAllExercises(),
      ]);

      setRoutines(routinesData);
      setExercises(exercisesData);

      console.log("Loaded routines and exercises");
    }

    load();
  }, []);


    function addRealizedExercise(selectedExercise: Exercise) {

      setAddExerciseModalVisible(true);
      
      const newRealizedExercise: RealizedExercise = {
        exerciseNumber: realizedExercises.length+1,
        exercise: selectedExercise,
        notes: "Introduce something!",
        workingSets: [
          {
            weight: 0,
            reps: 0,
            setNumber: 1,
            restAfter: 0,
            rir: 0,
          }
        ]
      }

      setRealizedExercises([...realizedExercises, newRealizedExercise]);

      setAddExerciseModalVisible(false);

    }

  function addWorkingSet(exerciseNumber: number) {
    setRealizedExercises((prev) => prev.map((ex) => {
      if (ex.exerciseNumber === exerciseNumber) {
        return {
          ...ex,
          workingSets: [
            ...ex.workingSets,
            {
              weight: 0,
              reps: 0,
              setNumber: ex.workingSets.length + 1,
              restAfter: 0,
              rir: 0
            },
          ],
        }
      } else {
        return ex;
      }
    }
    ))
  }

  function updateSetReps(reps: number, setNumber: number, exerciseNumber: number) {
    setRealizedExercises((prev) => prev.map((ex) => {
      if (ex.exerciseNumber === exerciseNumber) {

        return {
          ...ex,
          workingSets: (ex.workingSets.map((set) => {
                  if (set.setNumber === setNumber) {
                      return {
                          ...set,
                          reps: reps,
                      };
                  } else {
                      return set;
                  }
                }))
        } 


      } else {
        return ex;
      }

    }));
  }

  function updateSetWeight(weight: number, setNumber: number, exerciseNumber: number) {
    setRealizedExercises((prev) => prev.map((ex) => {
      if (ex.exerciseNumber === exerciseNumber) {

        return {
          ...ex,
          workingSets: (ex.workingSets.map((set) => {
                  if (set.setNumber === setNumber) {
                      return {
                          ...set,
                          weight: weight,
                      };
                  } else {
                      return set;
                  }
                }))
        } 


      } else {
        return ex;
      }

    }));
  }

  


    function closeModal() {
        setSessionDate(new Date(Date.now()));
        setSessionDateShow(false);
        //setSelectedRoutine();
        setRealizedExercises([]);
        setModalVisible(false);
    }

    async function saveSession() {
        
        const newSession: Session = {
          date: sessionDate.getDate().toString(),
          realizedExercises: realizedExercises,
          tag: {
            name: "null"
          }
        };

        const sessionId: number = await createSession(newSession);

        onAdd({
          ...newSession,
          id: sessionId,
        });

        closeModal();
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
                            <Text variant='titleMedium'>Create a new session</Text>
                            
                            <Button onPress={() => setSessionDateShow(true)} mode="contained">
                                Select a Date
                            </Button>
                            {sessionDateShow && <DateTimePicker
                            testID="dateTimePicker"
                            value={sessionDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate;
                                setSessionDateShow(false);
                                setSessionDate(currentDate!);
                            }}
                            />}

                            <Text variant='titleSmall'>Select a routine</Text>

                            <Picker
                                selectedValue={selectedRoutine}
                                onValueChange={(itemValue, itemIndex) =>
                                setSelectedRoutine(itemValue)
                                }>
                                {
                                    routines.map((routine: Routine) => (
                                        <Picker.Item label={routine.name} value={routine.id} />
                                    ))
                                }
                            </Picker>

                            <Text>Realized Exercises</Text>

                            <List.Section>
                                  {
                                    realizedExercises.map((ex: RealizedExercise) => (
                                      
                                      <List.Accordion
                                        key={ex.exerciseNumber}
                                        title={`${ex.exerciseNumber} - ${ex.exercise.name}`}
                                        left={() => <List.Icon icon="folder" />}>
                                          {ex.workingSets.map((set: WorkingSet) => (
                                            <View key={set.setNumber}>
                                              <TextInput
                                                key={1}
                                                style={styles.input}
                                                onChangeText={(newReps) => updateSetReps(+newReps, set.setNumber, ex.exerciseNumber)}
                                                value={set.reps.toString()}
                                                placeholder="reps"
                                                keyboardType='numeric'
                                              />
                                              <TextInput
                                                key={2}
                                                style={styles.input}
                                                onChangeText={(newWeight) => updateSetWeight(+newWeight, set.setNumber, ex.exerciseNumber)}
                                                value={set.weight.toString()}
                                                placeholder="weight"
                                                keyboardType="numeric"
                                              />
                                            </View>

                                          ))}

                                        <Button icon="plus" mode="contained" onPress={() => addWorkingSet(ex.exerciseNumber)}>
                                            add set
                                        </Button>
                                      </List.Accordion>
                                    ))
                                  }
                            </List.Section>

                            <Modal
                              animationType="slide"
                              transparent={true}
                              visible={addExerciseModalVisible}
                              onRequestClose={() => {
                              setAddExerciseModalVisible(!addExerciseModalVisible);
                            }}>
                                <Text variant='titleSmall'>Select an exercise</Text>

                                <Picker
                                  selectedValue={selectedExercise}
                                  onValueChange={(itemValue, itemIndex) =>
                                    {
                                      setSelectedExercise(itemValue);
                                      addRealizedExercise(itemValue);
                                      setAddExerciseModalVisible(false);
                                    }
                                  }>
                                  {
                                    exercises.map((ex: Exercise) => (
                                      <Picker.Item label={ex.name} value={ex} />
                                    ))
                                  }
                                </Picker>

                            </Modal>

                            <Button icon="plus" mode="contained" onPress={() => setAddExerciseModalVisible(true)}>
                                add exercise
                            </Button>

                            <View style={styles.buttonsContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={closeModal}>
                                    <Text variant='titleSmall'>Close</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={saveSession}>
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