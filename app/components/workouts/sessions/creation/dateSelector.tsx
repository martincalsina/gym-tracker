import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button } from 'react-native-paper';

type Props = {
    sessionDate: Date;
    setSessionDate: (arg: Date) => void;
}

export default function DateSelector({sessionDate, setSessionDate}: Props) {

    const [sessionDateShow, setSessionDateShow] = useState<boolean>(false);

    return (
        <>
            <Button onPress={() => setSessionDateShow(true)} mode="contained">
                                Select a Date
            </Button>
            
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