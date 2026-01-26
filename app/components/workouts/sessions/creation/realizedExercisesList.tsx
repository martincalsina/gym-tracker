import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, DataTable, IconButton, List, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  function removeRealizedExercise(exerciseNumber: number) {

    console.log(`Removing the exercise number ${exerciseNumber}`)

    setRealizedExercises((prev) => 
      prev.filter((rex) => rex.exerciseNumber != exerciseNumber).map((rex) => {
        if (rex.exerciseNumber > exerciseNumber) {
          return {
            ...rex,
            exerciseNumber: rex.exerciseNumber-1
          }
        } else {
          return rex;
        }
      })
    )

  }


    return (
        <>
            <Text>Realized Exercises</Text>
            <SafeAreaView>
              <FlatList
                style={styles.realizedExercisesList}
                data={realizedExercises}
                renderItem={({item}) => {
                    const realizedExercise = item;
                    return (
                          <View style={styles.realizedExerciseContainer}>

                              <IconButton onPress={() => removeRealizedExercise(realizedExercise.exerciseNumber)}style={styles.deleteButton} icon="trash-can-outline"/>

                              <List.Accordion
                                  contentStyle={styles.dropdownTitle}
                                  key={realizedExercise.exerciseNumber}
                                  title={`${realizedExercise.exerciseNumber} - ${realizedExercise.exercise.name}`}
                              >

                                        
                                        <DataTable>

                                          <DataTable.Header>

                                            <DataTable.Title>Set</DataTable.Title>
                                            <DataTable.Title>Reps</DataTable.Title>
                                            <DataTable.Title>Weight</DataTable.Title>

                                          </DataTable.Header>
                                

                                          <FlatList
                                            data={realizedExercise.workingSets} 
                                            renderItem={({item}) => {
                                              const set = item;
                                              return (
                                                  <WorkingSetDataInput key={set.setNumber} set={set} ex={realizedExercise} updateSetReps={updateSetReps} updateSetWeight={updateSetWeight}/>
                                              )
                                            }}
                                          />

                                        </DataTable>
                                        <View style={styles.buttonContainer}>
                                          <Button icon="plus" mode="outlined" labelStyle={styles.text} onPress={() => addWorkingSet(realizedExercise.exerciseNumber)}>
                                              add set
                                          </Button>
                                        </View>

                              </List.Accordion>
                          </View>
                          )
                      }
                    }
              />
            </SafeAreaView>
               
    
        </>
    )

}



const styles = StyleSheet.create({
    realizedExercisesList: {
      maxHeight: 230
    },
    buttonContainer: {
        alignItems: 'flex-start',      
        paddingVertical: 5
    },
    realizedExerciseContainer: {
      position: 'relative',
      flex: 1
    },
    deleteButton: {
      position: 'absolute',
      top: 6,
      left: -6,
      zIndex: 10,
    },
    dropdownTitle: {
      left: 20,
    },
    text: {
        fontSize: 12
    }
});