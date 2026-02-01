import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import WorkingSetDataInput from "./workingSetDataInput";

type Props = {
    realizedExercise: RealizedExercise;
    setRealizedExercises: (arg: ((arg: RealizedExercise[]) => RealizedExercise[])) => void;
    setShowededRealizedExercise: (exerciseIndex: number | null) => void;
}

export default function RealizedExerciseDetail({realizedExercise, setRealizedExercises, setShowededRealizedExercise}: Props) {


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

        setShowededRealizedExercise(null);

        setRealizedExercises((prev) =>
            prev.filter((rex) => rex.exerciseNumber != exerciseNumber).map((rex) => {
                if (rex.exerciseNumber > exerciseNumber) {
                    return {
                        ...rex,
                        exerciseNumber: rex.exerciseNumber - 1
                    }
                } else {
                    return rex;
                }
            })
        )

    }


    return (
        <>
            <View style={styles.headerContainer}>
                <Text variant="titleSmall">
                    {`${realizedExercise.exerciseNumber} - ${realizedExercise.exercise.name}`}
                </Text>
                <IconButton
                    icon="trash-can-outline"
                    onPress={() => removeRealizedExercise(realizedExercise.exerciseNumber)}
                />
            </View>

            <View style={styles.table}>

                <View style={styles.tableHeaderContainer}>
                    <Text style={styles.tableTitle}>Set</Text>
                    <Text style={styles.tableTitle}>Reps</Text>
                    <Text style={styles.tableTitle}>Weight</Text>
                </View>

                <FlatList
                    data={realizedExercise.workingSets}
                    renderItem={({ item }) => (
                        <WorkingSetDataInput
                            key={item.setNumber}
                            set={item}
                            ex={realizedExercise}
                            updateSetReps={updateSetReps}
                            updateSetWeight={updateSetWeight}
                            setRealizedExercises={setRealizedExercises}
                        />
                    )}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    icon="plus"
                    mode="outlined"
                    labelStyle={styles.text}
                    onPress={() => addWorkingSet(realizedExercise.exerciseNumber)}
                >
                    add set
                </Button>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //flex: 1,
    },
    table: {
        height: 200
    },
    tableHeaderContainer: {
        flexDirection: 'row',
        width: "100%",
    },
    tableTitle:{
        flex: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'flex-start',      
        paddingVertical: 5
    },
    text:{
        fontSize: 16
    },
})