import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { WorkingSet } from "@/app/db/model/WorkingSet";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
    set: WorkingSet;
    ex: RealizedExercise;
    updateSetReps: (reps: number, setNumber: number, exerciseNumber: number) => void;
    updateSetWeight: (reps: number, setNumber: number, exerciseNumber: number) => void;
}

export default function WorkingSetDataInput({set, ex, updateSetReps, updateSetWeight}: Props) {

    return (
        <>
            <View key={set.setNumber}>
                <TextInput
                    key={1}
                    style={styles.input}
                    onChangeText={(newReps) => updateSetReps(+newReps, set.setNumber, ex.exerciseNumber)}
                    value={set.reps.toString()}
                    placeholder="reps"
                    keyboardType='numeric'
                />
                <TextInput
                    key={2}
                    style={styles.input}
                    onChangeText={(newWeight) => updateSetWeight(+newWeight, set.setNumber, ex.exerciseNumber)}
                    value={set.weight.toString()}
                    placeholder="weight"
                    keyboardType="numeric"
                />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    input: {
    width: '100%',
    marginBottom: 12,
    },
})