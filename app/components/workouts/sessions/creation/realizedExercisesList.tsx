import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, DataTable, List, Text } from 'react-native-paper';
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
                          <List.Accordion
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
                                      <Button style={styles.button} icon="plus" mode="outlined" labelStyle={styles.text} onPress={() => addWorkingSet(realizedExercise.exerciseNumber)}>
                                          add set
                                      </Button>
                                    </View>

                          </List.Accordion>
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
    button: {
    },
    text: {
        fontSize: 12
    }
});