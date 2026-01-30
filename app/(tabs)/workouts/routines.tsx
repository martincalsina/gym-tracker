import AddRoutineButton from "@/app/components/workouts/routines/creation/addRoutineButton";
import RoutineCard from "@/app/components/workouts/routines/routineCard";
import { getAllRoutines, Routine } from '@/app/db/model/Routine';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RoutinesContext } from "./routinesContext";

export default function Routines() {

    const [routines, setRoutines] = useState<Routine[]>([]);

    async function loadRoutines() {
            const data = await getAllRoutines();
            setRoutines(data);
    }

    useEffect(() => {
  
        loadRoutines();

    }, []);

    return (
        <>
            <RoutinesContext value={loadRoutines}>
                <View>
                    <AddRoutineButton/>
                </View>
                <FlatList
                    style={styles.container}
                    data={routines}
                    keyExtractor={(item) => item.id!.toString()}
                    renderItem={({ item }) => (
                        <RoutineCard routine={item} />
                    )}
                />
            </RoutinesContext>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
})