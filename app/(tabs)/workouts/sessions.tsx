import SessionsList from "@/app/components/workouts/sessionsList";
import { StyleSheet, View } from "react-native";

const sessionsData: any[] =
[
        {
            id: 2,
            date: "10/11/25",
            routine: "PPL",
            tag: "Leg day",
            realizedExercices: [
                {
                    exercise: "Squat",
                    sets: [
                        {
                            setNumber: 1,
                            weight: 120,
                            reps: 3,
                        },
                        {
                            setNumber: 2,
                            weight: 100,
                            reps: 8,
                        },
                        {
                            setNumber: 3,
                            weight: 100,
                            reps: 8,
                        },
                    ]              
                },
                {
                    exercise: "Deadlift",
                    sets: [
                        {
                            setNumber: 1,
                            weight: 160,
                            reps: 3,
                        },
                        {
                            setNumber: 2,
                            weight: 140,
                            reps: 3,
                        },
                        {
                            setNumber: 3,
                            weight: 120,
                            reps: 3,
                        },
                    ]              
                },
            ],
        },
        {
            id: 1,
            date: "10/19/25",
            routine: "PPL",
            tag: "Pull day",
            realizedExercices: [
                {
                    exercise: "Chin Ups",
                    sets: [
                        {
                            setNumber: 1,
                            weight: 20,
                            reps: 5,
                        },
                        {
                            setNumber: 2,
                            weight: 20,
                            reps: 5,
                        },
                        {
                            setNumber: 3,
                            weight: 20,
                            reps: 5,
                        },
                    ]              
                },
                {
                    exercise: "Rows",
                    sets: [
                        {
                            setNumber: 1,
                            weight: 160,
                            reps: 3,
                        },
                        {
                            setNumber: 2,
                            weight: 140,
                            reps: 3,
                        },
                    ]              
                },
            ],
        }
    ]
;

export default function Sessions() {
    return (
        <View style={styles.container} >
            <SessionsList sessionsData={sessionsData}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})