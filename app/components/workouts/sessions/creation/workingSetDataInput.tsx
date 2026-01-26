import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { WorkingSet } from "@/app/db/model/WorkingSet";
import { StyleSheet } from "react-native";
import { DataTable, IconButton, TextInput } from "react-native-paper";

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
            <DataTable.Row key={set.setNumber} style={styles.row}>

                <IconButton size={20} onPress={() => removeSet(set.setNumber)} style={styles.deleteButton} icon="trash-can-outline"/>

                <DataTable.Cell numeric>{set.setNumber}</DataTable.Cell>
                <DataTable.Cell numeric>
                        <TextInput
                        contentStyle={styles.inputValue}
                        key={1}
                        mode="flat"
                        outlineColor="#ffffff00"
                        style={styles.inputBox}
                        onChangeText={(newReps) => updateSetReps(+newReps, set.setNumber, ex.exerciseNumber)}
                        value={set.reps.toString()}
                        placeholder="reps"
                        keyboardType='numeric'
                        />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    <TextInput
                        contentStyle={styles.inputValue}
                        key={2}
                        mode="flat"
                        outlineColor="#ffffff00"
                        style={styles.inputBox}
                        onChangeText={(newWeight) => updateSetWeight(+newWeight, set.setNumber, ex.exerciseNumber)}
                        value={set.weight.toString()}
                        placeholder="weight"
                        keyboardType="numeric"
                        />
                </DataTable.Cell>
            </DataTable.Row>
        </>
    )

}

const styles = StyleSheet.create({
    row: {
        position: 'relative',
        flex: 1,
    },
    deleteButton: {
        position: 'absolute',
        zIndex: 10,
    },
    inputBox: {
        height: 10,
        //backgroundColor: 'rgba(255, 255, 255, 0)',
        width: '100%',
        paddingHorizontal: 0
    },
    inputValue: {
        alignSelf:'flex-end',
        textAlign: 'right',
        paddingHorizontal: 3,
        //backgr
    }
})