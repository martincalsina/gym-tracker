import AddRoutineButton from "@/app/components/workouts/routines/creation/addRoutineButton";
import RoutinesList from "@/app/components/workouts/routines/routinesList";
import { getAllRoutines, Routine } from '@/app/db/model/Routine';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { RoutinesContext } from "./routinesContext";

export default function Routines() {

    const [routines, setRoutines] = useState<Routine[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    async function loadRoutines() {

            setIsFetchingData(true);

            const data = await getAllRoutines();
            setRoutines(data);
            setFilteredRoutines(data);

            setIsFetchingData(false);
    
    }

    useEffect(() => {
  
        loadRoutines();

    }, []);

    function resetRoutines() {
        setFilteredRoutines(routines);
    }

    function searchRoutines() {

        setFilteredRoutines(routines.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase().trim())));

    }

    return (
        <>
            <RoutinesContext value={loadRoutines}>
                <AddRoutineButton/>
                <View style={styles.container}>
                    <Searchbar 
                        style={styles.searchBar}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onClearIconPress={resetRoutines}
                        onIconPress={searchRoutines}
                        onSubmitEditing={searchRoutines}
                        placeholder="Search"
                    />
                    {isFetchingData && <ActivityIndicator style={styles.loadingIcon} size="large" animating={isFetchingData}/>}
                    <RoutinesList
                        routines={filteredRoutines}
                    />
                </View>
            </RoutinesContext>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    searchBar: {
        marginVertical: 10
    },
    loadingIcon: {
        marginTop: 40
    }
})