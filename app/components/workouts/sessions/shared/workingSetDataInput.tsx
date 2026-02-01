import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { WorkingSet } from "@/app/db/model/WorkingSet";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

type Props = {
    set: WorkingSet;
    ex: RealizedExercise;
    updateSetReps: (reps: number, setNumber: number, exerciseNumber: number) => void;
    updateSetWeight: (reps: number, setNumber: number, exerciseNumber: number) => void;
    setRealizedExercises: (arg: ((arg: RealizedExercise[]) => RealizedExercise[])) => void;
}

export default function WorkingSetDataInput({set, ex, updateSetReps, updateSetWeight, setRealizedExercises}: Props) {


    function removeSet(setNumber: number) {

        setRealizedExercises((prev) => 
            prev.map((rex) => {
                if (rex.exerciseNumber != ex.exerciseNumber) {
                    return rex;
                } else {
                    return {
                        ...rex,
                        workingSets: rex.workingSets.filter((wset) => wset.setNumber != setNumber).map((wset) => {
                            if (wset.setNumber > setNumber) {
                                return {
                                    ...wset,
                                    setNumber: wset.setNumber-1 
                                }
                            } else {
                                return wset
                            }
                        })
                    }
                }
            })
        )

    }

    return (
        <>
            <View key={set.setNumber} style={styles.row}>

                <IconButton size={20} onPress={() => removeSet(set.setNumber)} style={styles.deleteButton} icon="trash-can-outline"/>

                <Text style={styles.rowContent}>
                    {set.setNumber}
                </Text>
                <View style={styles.rowContent}>
                        <TextInput
                        contentStyle={styles.inputValue}
                        underlineStyle={styles.inputBoxUnderline}
                        key={1}
                        mode="flat"
                        outlineColor="#ffffff00"
                        style={styles.inputBox}
                        onChangeText={(newReps) => updateSetReps(+newReps, set.setNumber, ex.exerciseNumber)}
                        value={set.reps.toString()}
                        placeholder="reps"
                        keyboardType='numeric'
                        />
                </View>
                <View style={styles.rowContent} >
                    <TextInput
                        contentStyle={styles.inputValue}
                        underlineStyle={styles.inputBoxUnderline}
                        key={2}
                        mode="flat"
                        outlineColor="#ffffff00"
                        style={styles.inputBox}
                        onChangeText={(newWeight) => updateSetWeight(+newWeight, set.setNumber, ex.exerciseNumber)}
                        value={set.weight.toString()}
                        placeholder="weight"
                        keyboardType="numeric"
                        />
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    row: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
    },
    rowContent: {
        flex: 1,
        alignItems: "center",
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        height: 50,
        padding: 10
    },
    deleteButton: {
        position: 'absolute',
        zIndex: 10,
    },
    inputBox: {
        height: 25,
        backgroundColor: 'rgba(194, 194, 194, 1)',
        width: '100%',
        paddingHorizontal: 0,
        marginVertical: 'auto',
    },
    inputBoxUnderline: {
        borderRadius: 10,
    },
    inputValue: {
        //alignSelf:'flex-end',
        textAlign: 'center',
        //paddingHorizontal: 3,
        //backgr
    }
})