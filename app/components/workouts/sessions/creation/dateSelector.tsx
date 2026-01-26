import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
    sessionDate: Date;
    setSessionDate: (arg: Date) => void;
}

export default function DateSelector({sessionDate, setSessionDate}: Props) {

    const [sessionDateShow, setSessionDateShow] = useState<boolean>(false);

    return (
        <>
            <View style={styles.buttonContainer}>
                <Button onPress={() => setSessionDateShow(true)} mode="outlined" icon="calendar-month-outline"
                    labelStyle={styles.text}>
                                Select a date
                </Button>
            </View>
            
            {sessionDateShow && 
            <DateTimePicker
                testID="dateTimePicker"
                value={sessionDate}
                mode={'date'}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate;
                    setSessionDateShow(false);
                    setSessionDate(currentDate!);
                    }
                }
            />}
        </>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 300,
        alignItems: 'flex-start',      
    },
    text: {
        fontSize: 12
    }

})