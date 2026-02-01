import { SessionsContext } from "@/app/(tabs)/workouts/sessionsContext";
import { Exercise, getAllExercises } from "@/app/db/model/Exercise";
import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { getAllRoutines, Routine } from "@/app/db/model/Routine";
import { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import DateSelector from "./dateSelector";
import RealizedExercisesList from "./realizedExercisesList";
import RoutineSelector from "./routineSelector";

type Props = {
    title: string;
    defaultDate?: Date;
    defaultRoutine?: number;
    defaultRealizedExercises?: RealizedExercise[];
    onSave: (sessionDate: Date, realizedExercises: RealizedExercise[], selectedRoutine: number) => Promise<any>;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function SessionFormModal({title, defaultDate, defaultRoutine, defaultRealizedExercises, onSave, 
                                            modalVisible, setModalVisible}: Props) {
    
    const loadSessions = useContext(SessionsContext);

    const [isSavingSession, setIsSavingSession] = useState<boolean>(false);

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [routines, setRoutines] = useState<Routine[]>([]);

    const [sessionDate, setSessionDate] = useState<Date>(defaultDate || new Date());
    const [selectedRoutine, setSelectedRoutine] = useState<number>(defaultRoutine || 0); 
    const [realizedExercises, setRealizedExercises] = useState<RealizedExercise[]>(defaultRealizedExercises || []);
    
    function closeModal() {
          setModalVisible(false);
    }

    function restoreValues() {
          setSessionDate(defaultDate || new Date());
          setSelectedRoutine(defaultRoutine || 0); 
          setRealizedExercises(defaultRealizedExercises || []);
    }

    function discardChanges() {
        restoreValues();
        closeModal()
    }
    
    async function saveSession() {

        setIsSavingSession(true);

        await onSave(sessionDate, realizedExercises, selectedRoutine);
        await loadSessions();   

        setIsSavingSession(false);

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

          if (selectedRoutine == 0) {
            setSelectedRoutine(routinesData[0].id)
          }
    
          console.log("Loaded routines and exercises");
        }
    
        load();
      }, []);

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContent}>
                          <Text variant='titleLarge'>{title}</Text>

                          <DateSelector sessionDate={sessionDate} setSessionDate={setSessionDate} />

                          <RoutineSelector routines={routines} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} />

                          <RealizedExercisesList exercises={exercises} realizedExercises={realizedExercises} setRealizedExercises={setRealizedExercises} />

                          <View style={styles.buttonsContainer}>
                              <Button mode="outlined" onPress={discardChanges}>
                                  Close
                              </Button>
                              <Button mode="outlined" onPress={saveSession} loading={isSavingSession}>
                                  {isSavingSession ? "" : "Save"}
                              </Button>
                          </View>
                  </View>
            </Modal>
    )
}


const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: "auto",
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