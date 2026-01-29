import { getDb } from '../global';

export type Exercise = {
    id: number;
    name: string;
    description: string;
    cover: string;
};

export type CreateExerciseData = {
    name: string;
    description: string;
    cover: string;
}

export async function createExercise(exercise: CreateExerciseData) {

    let db = await getDb();
    const result = await db.runAsync(`
        INSERT INTO exercise (name, description, cover) VALUES (?, ?, ?);
    `, [exercise.name, exercise.description, exercise.cover]);
    return result.lastInsertRowId;

}

export async function getAllExercises() {
    let db = await getDb();
    const exercises: Exercise[] = await db.getAllAsync<Exercise>(`
        SELECT * FROM exercise;    
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

