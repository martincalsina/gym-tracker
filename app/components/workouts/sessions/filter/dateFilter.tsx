import { Session } from "@/app/db/model/Session";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, IconButton, Text } from "react-native-paper";

type Props = {
    setFilter: React.Dispatch<
        React.SetStateAction<(sessions: Session[]) => Session[]>
    >;
}

export default function DateFilter({setFilter}: Props) {

    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [usesFromDate, setUsesFromDate] = useState<boolean>(false);
    const [toDate, setToDate] = useState<Date>(new Date());
    const [usesToDate, setUsesToDate] = useState<boolean>(false);

    const [fromDateShow, setFromDateShow] = useState<boolean>(false);
    const [toDateShow, setToDateShow] = useState<boolean>(false);

    function dateToString(date: Date) {

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    }

    function resetFromDate() {
        setUsesFromDate(false);
    }

    function resetToDate() {
        setUsesToDate(false);
    }

    useEffect(() => {

        setFilter(() => (sessions: Session[]) => {
            let filteredSessions = sessions;

            if (usesFromDate) {
                filteredSessions = filteredSessions.filter(
                    s => s.date >= fromDate
                );
            }

            if (usesToDate) {
                filteredSessions = filteredSessions.filter(
                    s => s.date <= toDate
                );
            }

            return filteredSessions;
        });
        
    }, [usesFromDate, fromDate, usesToDate, toDate]);

    return (
        <>
            <Text variant="titleMedium">
                    Date
                </Text>

                <Divider />

                <View style={styles.filteredDatesContainer}>

                    <View style={styles.filterContainer}>
                        <View style={styles.datePickerLabelContainer}>
                            <Text variant="labelLarge" style={styles.datePickerLabelText}>
                                From
                            </Text>
                        </View>
                        <Button style={styles.datePickerButton} mode="contained" icon="calendar"
                            onPress={() => setFromDateShow(true)}
                        >
                            {usesFromDate ? dateToString(fromDate) : "No Date Selected"}
                        </Button>
                        <IconButton size={30} icon="close-box-outline" style={styles.dateResetButton}
                            onPress={resetFromDate}
                        />
                        {fromDateShow && 
                            <DateTimePicker
                            value={fromDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate;
                                setFromDateShow(false);
                                setUsesFromDate(true);
                                setFromDate(currentDate!);
                                }
                            }
                        />}
                    </View>

                    <View style={styles.filterContainer}>
                        <View style={styles.datePickerLabelContainer}>
                            <Text variant="labelLarge" style={styles.datePickerLabelText}>
                                To
                            </Text>
                        </View>
                        <Button style={styles.datePickerButton} mode="contained" icon="calendar"
                            onPress={() => setToDateShow(true)}
                        >
                            {usesToDate ? dateToString(toDate) : "No Date Selected"}
                        </Button>
                        <IconButton size={30} icon="close-box-outline" style={styles.dateResetButton}
                            onPress={resetToDate}
                        />
                        {toDateShow && 
                            <DateTimePicker
                            value={toDate}
                            mode={'date'}
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate;
                                setToDateShow(false);
                                setUsesToDate(true);
                                setToDate(currentDate!);
                                }
                            }
                        />}
                    </View>

                </View>

        </>
    )
}

const styles = StyleSheet.create({
    modalContentContainer: {
        paddingVertical: 30,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        backgroundColor: "#fff",
    },
    filteredDatesContainer: {
        paddingVertical: 5
    },
    filterContainer: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    datePickerButton: {
        width: 180,
        //height: 20,
        borderRadius: 10,
        backgroundColor: "#b8b8b8ff"
    },
     dateResetButton: {
        margin: 0
    },
    datePickerLabelContainer: {
        width: 35,
        //height: 20,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    datePickerLabelText: {
        width: '100%',
        textAlign: 'center'
    },
})