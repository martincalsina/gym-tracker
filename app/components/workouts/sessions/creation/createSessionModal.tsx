import { Exercise, getAllExercises } from '@/app/db/model/Exercise';
import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { getAllRoutines, Routine } from '@/app/db/model/Routine';
import { createSession, Session } from '@/app/db/model/Session';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DateSelector from './dateSelector';
import ExerciseSelector from './exerciseSelector';
import RealizedExercisesList from './realizedExercisesList';
import RoutineSelector from './routineSelector';


type Props = {
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
    onAdd: ((arg: any) => void);
}

const DEFAULT_COVER: string = "https://picsum.photos/700";

export default function CreateSessionModal({modalVisible, setModalVisible, onAdd}: Props) {

    
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [sessionDate, setSessionDate] = useState(new Date(Date.now()));
    const [selectedRoutine, setSelectedRoutine] = useState<number>(0);
    const [selectedExercise, setSelectedExercise] = useState<number>(0);
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

    }

    function closeModal() {
        setSessionDate(new Date(Date.now()));
        //setSessionDateShow(false);
        //setSelectedRoutine();
        setRealizedExercises([]);
        setModalVisible(false);
    }

    async function saveSession() {
        
        const newSession: Session = {
          date: `${sessionDate.getDate().toString()}/${sessionDate.getMonth().toString() + 1}/${sessionDate.getFullYear().toString()}`,
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
                            
                            <DateSelector sessionDate={sessionDate} setSessionDate={setSessionDate}/>

                            <RoutineSelector routines={routines} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} />

                            <RealizedExercisesList realizedExercises={realizedExercises} setRealizedExercises={setRealizedExercises}/>

                            <ExerciseSelector exercises={exercises} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} addRealizedExercise={addRealizedExercise} />    

                            <View style={styles.buttonsContainer}>
                                <Button mode="outlined" onPress={closeModal}> 
                                      Close
                                </Button>
                                <Button mode="outlined" onPress={saveSession}>
                                      Save
                                </Button>
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
    backgroundColor: '#f32821ff',
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