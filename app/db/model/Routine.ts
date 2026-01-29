import { getDb } from '../global';


// React usage type

export type Routine = {
    id: number;
    name: string;
    description: string;
    cover: string;
};

export type CreateRoutineData = {
    name: string;
    description: string;
    cover: string;
}

export type EditRoutineData = {
    id: number;
    name: string;
    description: string;
    cover: string;
}

export async function createRoutine(routine: CreateRoutineData) {

    let db = await getDb();
    const result = await db.runAsync(`
            INSERT INTO routine (name, description, cover) VALUES (?, ?, ?);
        `, [routine.name, routine.description, routine.cover]);

    return result.lastInsertRowId;

}

export async function editRoutine(routine: EditRoutineData) {
    
    const db = await getDb();

    await db.runAsync(`
        UPDATE routine SET name = ?, description = ?, cover = ? WHERE id = ?;
    `, [routine.name, routine.description, routine.cover, routine.id]);

}

export async function deleteRoutineById(id: number) {

    const db = await getDb();

    const result = await db.runAsync(`
        DELETE FROM routine WHERE id = ?;
    `, [id]);

    return result.changes;

}

export async function getRoutineById(id: number) {
    let db = await getDb();
    const routine: Routine | null = await db.getFirstAsync<Routine>(`
            SELECT * FROM routine AS r WHERE r.id = ?; 
        `, [id]);

    if (routine == null) {
        throw new Error(`No routine was found with the id ${id}`);
    }

    return routine;
}

export async function getAllRoutines() {
    let db = await getDb();
    const routines: Routine[] = await db.getAllAsync<Routine>(`
            SELECT * FROM routine;
        `);
    return routines;
}
