import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type Props = {
    sessionDate: Date;
    setSessionDate: (arg: Date) => void;
}

export default function DateSelector({sessionDate, setSessionDate}: Props) {

    const [sessionDateShow, setSessionDateShow] = useState<boolean>(false);

    function dateToString(date: Date) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    } 

    return (
        <>
            <Text variant="titleMedium">
                Select a Date
            </Text>

            <View style={styles.pickedDate}>
                <Button onPress={() => setSessionDateShow(true)} mode="outlined" icon="calendar-month-outline"
                    labelStyle={styles.text}>
                        {dateToString(sessionDate)}
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
    pickedDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    text: {
        fontSize: 15
    }

})