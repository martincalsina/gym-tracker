import { getDb } from '../global';
import { createRealizedExercise, deleteRealizedExercisesBySessionId, getRealizedExercisesBySessionId, RealizedExercise } from './RealizedExercise';
import { getRoutineById, Routine } from './Routine';
import { getTagById, Tag } from './Tag';


// React usage type

export type Session = {
    id: number;
    date: Date;
    tag: Tag | null;
    realizedExercises: RealizedExercise[];
    routine: Routine;
};

export type CreateSessionData = {
    date: Date;
    tag: Tag | null;
    realizedExercises: RealizedExercise[];
    routine_id: number;
}

export type EditSessionData = {
    id: number;
    date: Date;
    tag: Tag | null;
    realizedExercises: RealizedExercise[];
    routine_id: number;
}

// DB access type

export type SessionRow = {
    id: number;
    date: string;
    tag_id: number | null;
    routine_id: number;
};

export async function createSession(session: CreateSessionData) {

    let db = await getDb();

    console.log("creating session")

    const result = await db.runAsync(`
        INSERT INTO workoutSession (date, tag_id, routine_id) VALUES (?, ?, ?);
    `, [session.date.toISOString(), session.tag?.id ?? null, session.routine_id]);

    const sessionId: number = result.lastInsertRowId;

    await Promise.all(session.realizedExercises.map(async (rex) => createRealizedExercise(rex, sessionId)));

    return sessionId;
}

export async function editSession(session: EditSessionData) {

    const db = await getDb();

    await db.runAsync(`
        UPDATE workoutSession SET date=?, tag_id=?, routine_id=? WHERE id=?;
    `, [session.date.toISOString(), session.tag?.id ?? null, session.routine_id, session.id]);

    // we drop all original realized exercises and insert/reinsert the current ones
    await deleteRealizedExercisesBySessionId(session.id);
    await Promise.all(session.realizedExercises.map(async (rex) => createRealizedExercise(rex, session.id)));

    return;
}

export async function getLastSession() {

    const db = await getDb();

    const sessionRow: SessionRow | null = await db.getFirstAsync<SessionRow>(`
        SELECT w.id, w.date, w.tag_id, w.routine_id FROM workoutSession AS w ORDER BY w.date DESC;
    `);

    if (sessionRow == null) {
        return null;
    }

    const [realizedExercises, tag, routine] = await Promise.all(
        [
            getRealizedExercisesBySessionId(sessionRow.id),
            sessionRow.tag_id ? getTagById(sessionRow.tag_id) : null,
            getRoutineById(sessionRow.routine_id),
        ]
    );

    const session: Session = {
        id: sessionRow.id,
        date: new Date(sessionRow.date),
        tag: tag,
        realizedExercises: realizedExercises,
        routine: routine,
    };

    return session;

}

export async function getAllSessions() {

    const db = await getDb();

    const sessionRows: SessionRow[] = await db.getAllAsync<SessionRow>(`
        SELECT w.id, w.date, w.tag_id, w.routine_id FROM workoutSession AS w ORDER BY w.date DESC;
    `);

    const sessions: Session[] = await Promise.all(sessionRows.map(async (sessionRow: SessionRow) => {
        const [realizedExercises, tag, routine] = await Promise.all(
            [
                getRealizedExercisesBySessionId(sessionRow.id),
                sessionRow.tag_id ? getTagById(sessionRow.tag_id) : null,
                getRoutineById(sessionRow.routine_id),
            ]
        );

        const session: Session = {
            id: sessionRow.id,
            date: new Date(sessionRow.date),
            tag: tag,
            realizedExercises: realizedExercises,
            routine: routine,
        };

        return session;
    }
    ));

    return sessions;
}

export async function deleteSessionById(id: number) {

    const db = await getDb();

    const result = await db.runAsync(`DELETE FROM workoutSession AS w WHERE w.id = ?;`, [id]);

    return result.changes;

}
