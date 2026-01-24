import { RealizedExercise } from '@/app/db/RealizedExercise';
import { WorkingSet } from '@/app/db/WorkingSet';
import { StyleSheet } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import WorkingSetDataInput from './workingSetDataInput';

type Props = {
    realizedExercises: RealizedExercise[];
    setRealizedExercises: (arg: ((arg: RealizedExercise[]) => RealizedExercise[])) => void;
}

export default function RealizedExercisesList({realizedExercises, setRealizedExercises}: Props) {

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
        }))
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


    return (
        <>
            <Text>Realized Exercises</Text>

            <List.Section>
                {
                    realizedExercises.map((ex: RealizedExercise) => (

                        <List.Accordion
                            key={ex.exerciseNumber}
                            title={`${ex.exerciseNumber} - ${ex.exercise.name}`}
                            left={() => <List.Icon icon="folder" />}>
                            {ex.workingSets.map((set: WorkingSet) => (
                                
                                <WorkingSetDataInput key={set.setNumber} set={set} ex={ex} updateSetReps={updateSetReps} updateSetWeight={updateSetWeight}/>

                            ))}

                            <Button icon="plus" mode="contained" onPress={() => addWorkingSet(ex.exerciseNumber)}>
                                add set
                            </Button>
                        </List.Accordion>
                    ))
                }
            </List.Section>
        </>
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