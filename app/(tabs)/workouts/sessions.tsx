import AddSessionButton from "@/app/components/workouts/sessions/addSessionButton";
import SessionsList from "@/app/components/workouts/sessions/sessionsList";
import { getAllSessions, Session } from '@/app/db/Session';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";



export default function Sessions() {

    const [sessions, setSessions] = useState<Session[]>([]);

    function addSession(newSession: Session) {
        
        setSessions([...sessions, newSession]);

    }

    useEffect(() => {

        async function loadSessions() {
            const data: Session[] = await getAllSessions();
            setSessions(data);
        }

        loadSessions();

    }, [])

    return (
        <View style={styles.container} >
            <AddSessionButton onAdd={addSession}/>
            <SessionsList sessionsData={sessions}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})