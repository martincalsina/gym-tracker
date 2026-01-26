import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { WorkingSet } from "@/app/db/model/WorkingSet";
import { StyleSheet } from "react-native";
import { DataTable, TextInput } from "react-native-paper";

type Props = {
    set: WorkingSet;
    ex: RealizedExercise;
    updateSetReps: (reps: number, setNumber: number, exerciseNumber: number) => void;
    updateSetWeight: (reps: number, setNumber: number, exerciseNumber: number) => void;
}

export default function WorkingSetDataInput({set, ex, updateSetReps, updateSetWeight}: Props) {

    return (
        <>
            <DataTable.Row key={set.setNumber}>
                <DataTable.Cell>{set.setNumber}</DataTable.Cell>
                <DataTable.Cell>
                        <TextInput
                        key={1}
                        mode="outlined"
                        style={styles.input}
                        onChangeText={(newReps) => updateSetReps(+newReps, set.setNumber, ex.exerciseNumber)}
                        value={set.reps.toString()}
                        placeholder="reps"
                        keyboardType='numeric'
                        />
                </DataTable.Cell>
                <DataTable.Cell>
                    <TextInput
                        key={2}
                        mode="outlined"
                        style={styles.input}
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
    input: {
        height: 10,
        backgroundColor: '#ffffff00',
        width: '100%',
    }
})