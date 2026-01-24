import { Routine } from "@/app/db/model/Routine";
import { Picker } from "@react-native-picker/picker";
import { Text } from 'react-native-paper';

type Props = {
    routines: Routine[];
    selectedRoutine: number;
    setSelectedRoutine: (arg: number) => void;
}

export default function RoutineSelector({routines, selectedRoutine, setSelectedRoutine}: Props) {

    return (
        <>
            <Text variant='titleSmall'>Select a routine</Text>

            <Picker
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
        </>
    )

}