import { Exercise, getAllExercises } from "@/app/db/model/Exercise";
import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { getAllRoutines, Routine } from "@/app/db/model/Routine";
import { editSession, EditSessionData, Session } from "@/app/db/model/Session";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateSelector from "../creation/dateSelector";
import ExerciseSelector from "../creation/exerciseSelector";
import RealizedExercisesList from "../creation/realizedExercisesList";
import RoutineSelector from "../creation/routineSelector";

type Props = {
    session: Session;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function EditSessionModal({session, modalVisible, setModalVisible}: Props) {
    
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [routines, setRoutines] = useState<Routine[]>([]);

    const [sessionDate, setSessionDate] = useState<Date>(session.date);
    const [selectedRoutine, setSelectedRoutine] = useState<number>(session.routine.id); 
    const [realizedExercises, setRealizedExercises] = useState<RealizedExercise[]>(session.realizedExercises)
    const [selectedExercise, setSelectedExercise] = useState<number>(0)

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
            
            const editedSession: EditSessionData = {
              id: session.id,
              date: sessionDate,
              realizedExercises: realizedExercises,
              tag: session.tag,
              routine_id: selectedRoutine,
            };
    
            await editSession(editedSession);
    
            closeModal();
    }
    
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

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <SafeAreaView style={{flex: 1}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text variant='titleMedium'>Create a new session</Text>

                        <DateSelector sessionDate={sessionDate} setSessionDate={setSessionDate} />

                        <RoutineSelector routines={routines} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} />

                        <RealizedExercisesList realizedExercises={realizedExercises} setRealizedExercises={setRealizedExercises} />

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
                </SafeAreaView>
            </Modal>
    )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 'auto',
    bottom: 'auto',
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
  }

});
