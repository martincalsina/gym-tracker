import { Routine } from "@/app/db/model/Routine";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';

type Props = {
    routines: Routine[];
    selectedRoutine: number;
    setSelectedRoutine: (arg: number) => void;
}

export default function RoutineSelector({ routines, selectedRoutine, setSelectedRoutine }: Props) {

    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <>
            <Text variant='titleMedium'>Select a routine</Text>

            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedRoutine}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRoutine(itemValue)
                    }>
                    {
                        routines.map((routine: Routine) => (
                            <Picker.Item label={routine.name} value={routine.id} />
                        ))
                    }
                </Picker>
            </View>
        </>
    )

}

const createStyles = (theme: MD3Theme) => StyleSheet.create({
    pickerContainer: {
        width: 200,
        padding: 0
    },
    picker: {
        color: theme.colors.primary,
        backgroundColor: theme.colors.surfaceVariant
    },
    pickerItem: { //doesnt work for android :(
        color: theme.colors.primary,
        backgroundColor: theme.colors.surfaceVariant,
    }
})