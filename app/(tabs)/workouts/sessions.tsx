import AddSessionButton from "@/app/components/workouts/sessions/creation/addSessionButton";
import SessionsList from "@/app/components/workouts/sessions/sessionsList";
import { getAllSessions, Session } from '@/app/db/model/Session';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SessionsContext } from "./sessionsContext";



export default function Sessions() {

    const [sessions, setSessions] = useState<Session[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    async function loadSessions() {
        
        setIsFetchingData(true);

        const data: Session[] = await getAllSessions();
        setSessions(data);

        setIsFetchingData(false);
    }

    useEffect(() => {

        loadSessions();

    }, [])

    return (
        <>
            <SessionsContext value={loadSessions}>
                <View>
                    <AddSessionButton/>
                </View>
                {isFetchingData && <ActivityIndicator size="large" animating={isFetchingData}/>}
                <SessionsList sessionsData={sessions}/>
            </SessionsContext>
        </>
    )
};

const styles = StyleSheet.create({
})