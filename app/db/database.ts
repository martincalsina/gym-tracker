import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations';

let db: SQLite.SQLiteDatabase | null = null;

async function getDb() {

    if (!db) {
        db = await SQLite.openDatabaseAsync('gym-tracker.db');
        await runMigrations(db);
    }

    return db;

}

export type Routine = {
    id?: number;
    name: string;
    description: string;
    cover: string;
}

// ROUTINE

export async function createRoutine(routine: Routine) {

    let db = await getDb();
    const result = await db.runAsync(`
            INSERT INTO routine (name, description, cover) VALUES (?, ?, ?);
        `, [routine.name, routine.description, routine.cover]);
    
    return result.lastInsertRowId;

}

export async function getRoutine(id: number) {
    let db = await getDb();
    const routine: Routine | null = await db.getFirstAsync<Routine>(`
            SELECT * FROM routine AS r WHERE r.id = ${id}; 
        `);
    return routine;
}

export async function getAllRoutines() {
    let db = await getDb();
    const routines: Routine[] = await db.getAllAsync<Routine>(`
            SELECT * FROM routine;
        `); 
    return routines;
}

// EXERCISE

export type Exercise = {
    id?: number;
    name: string;
    description: string;
    cover: string;
}

export async function createExercise(exercise: Exercise) {

    let db = await getDb();
    const result = await db.runAsync(`
        INSERT INTO exercise (name, description, cover) VALUES (?, ?, ?);
    `, [exercise.name, exercise.description, exercise.cover]);
    return result.lastInsertRowId;

}

export async function getExercise(id: number) {
    let db = await getDb();
    const exercise: Exercise | null = await db.getFirstAsync<Exercise>(`
        SELECT * FROM exercise AS e WHERE e.id = ${id};
    `)
    return exercise
}

export async function getAllExercises() {
    let db = await getDb();
    const exercises: Exercise[] = await db.getAllAsync<Exercise>(`
        SELECT * FROM exercise;    
    `);
    return exercises;
}