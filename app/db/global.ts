import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations';
import { seedDefaultExercises } from './seeds/defaultExercises';

let db: SQLite.SQLiteDatabase | null = null;

const __DEBUG__ = false;

export async function getDb() {

    if (!db) {

        db = await SQLite.openDatabaseAsync('gym-tracker.db');
        await runMigrations(db);
        await seedDefaultExercises(db);
        // Looks like if foreign_keys are not activated explicitly on EACH connection then the ON DELETE CASCADE won't 
        // delete child rows if the parent one is removed (even if a migration was done ensuring that)
        // SQLite docs states 'Foreign key constraints are disabled by default (for backwards compatibility), so must be enabled separately for each database connection.'
        // https://sqlite.org/foreignkeys.html#fk_enable
        await db.execAsync(`PRAGMA foreign_keys = 1`);
        
        if (__DEBUG__) {

            //await db.execAsync(`
            //    PRAGMA foreign_keys = ON;
            //    DELETE FROM routine WHERE id = 7;`);
            // await db.execAsync(`DELETE FROM exercise`);

            console.log("ROUTINES:")
            console.log(
                await db.getAllAsync(`SELECT * FROM routine;`)
            );
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
            //console.log("EXERCISES:")
            //console.log(
            //    await db.getAllAsync(`SELECT * FROM exercise;`)
            //);

        }

    }

    return db;

}


