import { Exercise } from '@/app/db/model/Exercise';
import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { imageRegistry } from '@/assets/imageRegistry';
import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseSelector from './exerciseSelector';
import RealizedExerciseDetail from './realizedExerciseDetail';

type Props = {
    exercises: Exercise[];
    realizedExercises: RealizedExercise[];
    setRealizedExercises: (arg: ((arg: RealizedExercise[]) => RealizedExercise[])) => void;
}

export default function RealizedExercisesList({exercises, realizedExercises, setRealizedExercises}: Props) {

    const [selectedExercise, setSelectedExercise] = useState<number>(0);
    const [showedRealizedExercise, setShowedRealizedExercise] = useState<number | null>(null);

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
    
          setRealizedExercises(() => [...realizedExercises, newRealizedExercise]);
    
    }

    return (
        <>
            <Text variant='titleMedium'>Realized Exercises</Text>
            <SafeAreaView>

              <View style={styles.realizedExercisesPreviewContainer}>
                
                  <ExerciseSelector exercises={exercises} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} addRealizedExercise={addRealizedExercise} />
                  <FlatList
                    data={realizedExercises}
                    horizontal={true}
                    renderItem={({item, index}) => {
                      const cover = item.exercise.cover;
                      let sourceCover;

                      if (cover.startsWith("file://") || cover.startsWith("content://")) {
                        sourceCover = { uri: cover };
                      } else {
                        sourceCover = imageRegistry[cover];
                      }

                      return (
                          <Pressable onPress={() => setShowedRealizedExercise(index)}>
                              <Image style={
                                        [ styles.realizedExercisePreview, 
                                          {opacity: index == showedRealizedExercise ? 0.6 : 1}
                                        ]} 
                                    source={sourceCover}/>
                          </Pressable>)
                    }}
                  />
                      
              </View>

              {showedRealizedExercise != null && (() => {

                const realized: RealizedExercise = realizedExercises[showedRealizedExercise];

                return (
                  <RealizedExerciseDetail
                    realizedExercise={realized}
                    setRealizedExercises={setRealizedExercises}
                    setShowededRealizedExercise={setShowedRealizedExercise}
                  />
                );
              })()}


              
          </SafeAreaView>
               
    
        </>
    )

}



const styles = StyleSheet.create({
    
    realizedExercisesPreviewContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    realizedExercisePreview: {
      height: 100,
      width: 80,
      borderColor: "#000",
      borderWidth: 1,
    },
    buttonContainer: {
        alignItems: 'flex-start',      
        paddingVertical: 5
    },
    realizedExerciseContainer: {
      position: 'relative',
      flex: 1
    },
});