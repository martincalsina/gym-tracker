import AddSessionButton from "@/app/components/workouts/sessions/addSessionButton";
import SessionsList from "@/app/components/workouts/sessions/sessionsList";
import { getAllSessions, Session } from '@/app/db/model/Session';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SessionsContext } from "./sessionsContext";



export default function Sessions() {

    const [sessions, setSessions] = useState<Session[]>([]);

    function addSession(newSession: Session) {
        
        setSessions([...sessions, newSession]);

    }

    async function loadSessions() {
        const data: Session[] = await getAllSessions();
        setSessions(data);
    }

    useEffect(() => {

        loadSessions();

    }, [])

    return (
        <>
            <SessionsContext value={loadSessions}>
                <View>
                    <AddSessionButton onAdd={addSession}/>
                </View>
                <SessionsList sessionsData={sessions}/>
            </SessionsContext>
        </>
    )
};

const styles = StyleSheet.create({
})