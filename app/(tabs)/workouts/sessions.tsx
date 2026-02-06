import AddSessionButton from "@/app/components/workouts/sessions/creation/addSessionButton";
import FilterSessionsButton from "@/app/components/workouts/sessions/filter/filterSessionsButton";
import SessionsList from "@/app/components/workouts/sessions/sessionsList";
import { getAllSessions, Session } from '@/app/db/model/Session';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SessionsContext } from "./sessionsContext";



export default function Sessions() {

    const [sessions, setSessions] = useState<Session[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
    

    async function loadSessions() {
        
        setIsFetchingData(true);

        const data: Session[] = await getAllSessions();
        setSessions(data);
        setFilteredSessions(data);

        setIsFetchingData(false);
    }

    useEffect(() => {

        loadSessions();

    }, [])

    return (
        <>
            <SessionsContext value={loadSessions}>
                <View style={styles.headButtonsContainer}>
                    <AddSessionButton/>
                    <FilterSessionsButton sessions={sessions} setFilteredSessions={setFilteredSessions} />
                </View>
                {isFetchingData && <ActivityIndicator size="large" animating={isFetchingData}/>}
                <SessionsList sessionsData={filteredSessions}/>
            </SessionsContext>
        </>
    )
};

const styles = StyleSheet.create({
    headButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
})