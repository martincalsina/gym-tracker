import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations';

let db: SQLite.SQLiteDatabase | null = null;

const __DEBUG__ = false;

export async function getDb() {

    if (!db) {
        
        db = await SQLite.openDatabaseAsync('gym-tracker.db');
        await runMigrations(db);
        
        if (__DEBUG__) {
            
            console.log("WORKOUT SESSIONS:")
            console.log(
                await db.getAllAsync(`SELECT * FROM workoutSession;`)
            );
            console.log("REALIZED EXERCISES:")
            console.log(
                await db.getAllAsync(`SELECT * FROM realizedExercise;`)
            );
            console.log("WORKING SETS:")
            console.log(
                await db.getAllAsync(`SELECT * FROM workingSet;`)
            );
            console.log("EXERCISES:")
            console.log(
                await db.getAllAsync(`SELECT * FROM exercise;`)
            );

        }

    }

    return db;

}


