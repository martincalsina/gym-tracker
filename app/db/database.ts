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

export async function createRoutine(routine: Routine) {

    let db = await getDb();
    const result = await db.runAsync(`
            INSERT INTO routine (name, description, cover) VALUES (?, ?, ?);
        `, [routine.name, routine.description, routine.cover]);
    
    return result.lastInsertRowId;

}
