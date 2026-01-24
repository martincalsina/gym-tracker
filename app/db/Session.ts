import { getDb } from './global';
import { createRealizedExercise, getRealizedExercisesBySessionId, RealizedExercise } from './RealizedExercise';
import { getTagById, Tag } from './Tag';


// React usage type

export type Session = {
    id?: number;
    date: string;
    tag: Tag | null;
    realizedExercises: RealizedExercise[];
};

// DB access type

export type SessionRow = {
    id: number;
    date: string;
    tag_id: number | null;
};

export async function createSession(session: Session) {

    let db = await getDb();

    const result = await db.runAsync(`
        INSERT INTO workoutSession (date, tag_id) VALUES (?, ?);
    `, [session.date, session.tag?.id ?? null]);

    const sessionId: number = result.lastInsertRowId;

    await Promise.all(session.realizedExercises.map(async (rex) => createRealizedExercise(rex, sessionId)));

    return sessionId;
}

export async function getAllSessions() {

    const db = await getDb();

    const sessionRows: SessionRow[] = await db.getAllAsync<SessionRow>(`
        SELECT w.id, w.date, w.tag_id FROM workoutSession AS w;
    `);

    const sessions: Session[] = await Promise.all(sessionRows.map(async (sessionRow: SessionRow) => {
        const [realizedExercises, tag] = await Promise.all(
            [
                getRealizedExercisesBySessionId(sessionRow.id),
                sessionRow.tag_id ? getTagById(sessionRow.tag_id) : null
            ]
        );

        const session: Session = {
            id: sessionRow.id,
            date: sessionRow.date,
            tag: tag,
            realizedExercises: realizedExercises
        };

        return session;
    }
    ));

    return sessions;
}

