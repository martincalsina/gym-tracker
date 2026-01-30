import { getDb } from '../global';

export type Exercise = {
    id: number;
    name: string;
    description: string;
    cover: string;
    isDefault: boolean;
};

export type CreateExerciseData = {
    name: string;
    description: string;
    cover: string;
}

export type EditExerciseData = {
    id: number;
    name: string;
    description: string;
    cover: string;
}

// this function is only for user created exercises, then it is asummed that isDefault column will have a 0 value
export async function createExercise(exercise: CreateExerciseData) {

    let db = await getDb();
    const result = await db.runAsync(`
        INSERT INTO exercise (name, description, cover, isDefault) VALUES (?, ?, ?, ?);
    `, [exercise.name, exercise.description, exercise.cover, 0]);
    return result.lastInsertRowId;

}

export async function editExercise(exercise: EditExerciseData) {

    const db = await getDb();
    const result = await db.runAsync(`
        UPDATE exercise SET name = ?, description = ?, cover = ? WHERE id = ?;    
    `, [exercise.name, exercise.description, exercise.cover, exercise.id]);

}

export async function deleteExerciseById(id: number) {

    const db = await getDb();
    
    const result = await db.runAsync(`
        DELETE FROM exercise WHERE id = ?;
    `, [id]);

    return result.changes;

}

export async function getAllExercises() {
    let db = await getDb();
    const exercises: Exercise[] = await db.getAllAsync<Exercise>(`
        SELECT id, name, description, cover, isDefault FROM exercise;    
    `);
    return exercises;
}

export async function getExerciseById(id: number) {

    const db = await getDb();

    const exercise: Exercise | null = await db.getFirstSync<Exercise>(`
        SELECT * FROM exercise AS e WHERE e.id = ?;
    `, id);

    if (exercise == null) {
        throw new Error(`There is no exercise with the id: ${id}`);
    }

    return exercise;
}

