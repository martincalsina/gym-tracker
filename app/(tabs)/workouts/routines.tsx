import AddRoutineButton from "@/app/components/workouts/routines/addRoutineButton";
import RoutineCard from "@/app/components/workouts/routines/routineCard";
import { getAllRoutines, Routine } from "@/app/db/database";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Routines() {

    const [routines, setRoutines] = useState<Routine[]>([]);

    useEffect(() => {
  

        async function loadRoutines() {
            const data = await getAllRoutines();
            setRoutines(data);
        }

        loadRoutines();

    }, []);

    function addRoutine(newRoutine: Routine) {
        setRoutines([...routines, newRoutine]);
    }

    return (
        <>
            <View>
                <AddRoutineButton onAdd={addRoutine}/>
            </View>
            <FlatList
                style={styles.container}
                data={routines}
                keyExtractor={(item) => item.id!.toString()}
                renderItem={({ item }) => (
                    <RoutineCard routine={item} />
                )}
            />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
})