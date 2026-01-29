import { getDb } from '../global';
import { Exercise, getExerciseById } from './Exercise';
import { WorkingSet, createWorkingSet, getWorkingSetsByRealizedExerciseId } from './WorkingSet';

// React usage type

export type RealizedExercise = {
    id?: number;
    exerciseNumber: number;
    exercise: Exercise;
    notes: string;
    workingSets: WorkingSet[];
};

// DB access type

type RealizedExerciseRow = {
    id: number;
    exerciseNumber: number;
    notes: string;
    session_id: string;
    exercise_id: number;
};

export async function createRealizedExercise(realizedExercise: RealizedExercise, sessionId: number) {

    let db = await getDb();

    const result = await db.runAsync(`
        INSERT INTO realizedExercise (exerciseNumber, notes, session_id, exercise_id) VALUES (?, ?, ?, ?);
    `, [realizedExercise.exerciseNumber, realizedExercise.notes, sessionId, realizedExercise.exercise.id ?? null]);


    const realizedExerciseId = result.lastInsertRowId;

    await Promise.all(realizedExercise.workingSets.map(async (wset) => createWorkingSet(wset, realizedExerciseId)));

    return realizedExerciseId;

}

export async function deleteRealizedExercisesBySessionId(sessionId: number) {

    const db = await getDb();

    const result = await db.runAsync(`
        DELETE FROM realizedExercise AS r WHERE r.session_id = ?;    
    `, [sessionId]);

}

export async function getRealizedExercisesBySessionId(id: number) {

    const db = await getDb();

    const realizedExerciseRows: RealizedExerciseRow[] = await db.getAllAsync<RealizedExerciseRow>(`
        SELECT * FROM realizedExercise AS r WHERE r.session_id = ?;
    `, id);

    const realizedExercises: RealizedExercise[] = await Promise.all(
        realizedExerciseRows.map(async (realizedExerciseRow: RealizedExerciseRow) => {

            const [exercise, workingSets] = await Promise.all([
                getExerciseById(realizedExerciseRow.exercise_id),
                getWorkingSetsByRealizedExerciseId(realizedExerciseRow.id)
            ]);

            const realizedExercise: RealizedExercise = {
                id: realizedExerciseRow.id,
                exerciseNumber: realizedExerciseRow.exerciseNumber,
                exercise: exercise,
                notes: realizedExerciseRow.notes,
                workingSets: workingSets
            };

            return realizedExercise;
        })
    );

    return realizedExercises;

}

