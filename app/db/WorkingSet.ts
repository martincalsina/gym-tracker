import { getDb } from './global';

// React usage type

export type WorkingSet = {
    id?: number;
    weight: number;
    reps: number;
    setNumber: number;
    restAfter: number;
    rir: number | null;
};

// DB access type

type WorkingSetRow = {
    id: number;
    weight: number;
    reps: number;
    setNumber: number;
    restAfter: number;
    rir: number | null;
    realizedExercise_id: number;
};

export async function createWorkingSet(workingSet: WorkingSet, realizedExerciseId: number) {

    let db = await getDb();

    const result = await db.runAsync(`
        INSERT INTO workingSet (weight, reps, setNumber, restAfter, rir, realizedExercise_id) VALUES (?, ?, ?, ?, ?, ?);
    `, [workingSet.weight, workingSet.reps, workingSet.setNumber, workingSet.restAfter, workingSet.rir, realizedExerciseId]);

    let workingSetId = result.lastInsertRowId;

    return workingSetId;
}

export async function getWorkingSetsByRealizedExerciseId(id: number) {

    const db = await getDb();

    const workingSetRows: WorkingSetRow[] = await db.getAllAsync(`
        SELECT * FROM workingSet AS w WHERE w.realizedExercise_id = ?;
    `, id);

    const workingSets: WorkingSet[] = workingSetRows.map((workingSetRow) => {
        const workingSet: WorkingSet = {
            id: workingSetRow.id,
            weight: workingSetRow.weight,
            reps: workingSetRow.reps,
            setNumber: workingSetRow.setNumber,
            restAfter: workingSetRow.restAfter,
            rir: workingSetRow.rir,
        };
        return workingSet;
    });

    return workingSets;

}

