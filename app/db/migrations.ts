import * as SQLite from 'expo-sqlite';

// if true, drops all DB tables and resets migrations
const __DEV__ = false;

type Migration = {
    version: number;
    description: string; 
    up: (db: SQLite.SQLiteDatabase) => Promise<void>;
};

const migrations: Migration[] = [
    {
        version: 1,
        description: "create routine table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE routine (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    cover  NOT NULL
                );
            `);
        },
    },
    {
        version: 2,
        description: "create exercise table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE exercise (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    cover NOT NULL
                );    
            `);
        },
    },
    {
        version: 3,
        description: "activate foreign keys",
        up: async (db) => {
            await db.execAsync(`PRAGMA foreign_keys = 1;`)
        },

    },
    {
        version: 4,
        description: "create tag table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE tag (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                );    
            `);
        }
    },
    {
        version: 5,
        description: "create session table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE workoutSession (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    tag_id INTEGER,
                    FOREIGN KEY(tag_id) REFERENCES tag(id)
                );
            `);
        }
    },
    {
        version: 6,
        description: "create realizedExercise table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE realizedExercise (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    exerciseNumber INTEGER NOT NULL,
                    notes TEXT,
                    session_id INTEGER NOT NULL,
                    FOREIGN KEY(session_id) REFERENCES workoutSession(id)
                );
            `);
        }
    },
    {
        version: 7,
        description: "create workingSet table",
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE workingSet (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    weight NUMERIC NOT NULL,
                    reps INTEGER NOT NULL,
                    setNumber INTEGER NOT NULL,
                    restAfter NUMERIC DEFAULT 0 NOT NULL,
                    rir INTEGER,
                    realizedExercise_id INTEGER NOT NULL,
                    FOREIGN KEY(realizedExercise_id) REFERENCES realizedExercise(id)
                );    
            `);
        }
    },
    {
        version: 8,
        description: "add exercise_id column to realizedExercise table",
        up: async (db) => {
            await db.execAsync(`
                ALTER TABLE realizedExercise ADD COLUMN exercise_id INTEGER REFERENCES exercise(id);
            `);
        }
    },
    {
        version: 9,
        description: "adds routine_id fk to workoutSession table",
        up: async (db) => {
            await db.execAsync(`
                ALTER TABLE workoutSession ADD COLUMN routine_id INTEGER NOT NULL REFERENCES routine(id);    
            `)
        }
    },
    {
        version: 10,
        description: "enables WAL journal mode",
        up: async (db) => {
            await db.execAsync(`PRAGMA journal_mode = WAL;`)
        }
    },
    {
        version: 11,
        description: "adds ON DELETE CASCADE to routine_id in workoutSession table",
        up: async (db) => {
            await db.execAsync(`
                PRAGMA foreign_keys = 0;
                ALTER TABLE workoutSession RENAME TO workoutSession_old;
                CREATE TABLE workoutSession (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    tag_id INTEGER REFERENCES tag(id),
                    routine_id INTEGER NOT NULL REFERENCES routine(id) ON DELETE CASCADE
                );
                INSERT INTO workoutSession (id, date, tag_id, routine_id)
                SELECT id, date, tag_id, routine_id FROM workoutSession_old;
                DROP TABLE workoutSession_old;
                PRAGMA foreign_keys = 1;
            `)
        }
    },
    {
        version: 12,
        description: "adds ON DELETE CASCADE to workoutSession_id in realizedExercise table",
        up: async (db) => {
            await db.execAsync(`
                PRAGMA foreign_keys = 0;
                ALTER TABLE realizedExercise RENAME TO realizedExercise_old;
                CREATE TABLE realizedExercise (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    exerciseNumber INTEGER NOT NULL,
                    notes TEXT,
                    session_id INTEGER NOT NULL REFERENCES workoutSession(id) ON DELETE CASCADE,
                    exercise_id INTEGER NOT NULL REFERENCES exercise(id)
                );
                INSERT INTO realizedExercise (id, exerciseNumber, notes, session_id, exercise_id)
                SELECT id, exerciseNumber, notes, session_id, exercise_id FROM realizedExercise_old;
                DROP TABLE realizedExercise_old;
                PRAGMA foreign_keys = 1;
            `);
        }
    },
    {
        version: 13,
        description: "adds ON DELETE CASCADE to realizedExercise_id in workingSet table",
        up: async (db) => {
            await db.execAsync(`
                PRAGMA foreign_keys = 0;
                ALTER TABLE workingSet RENAME TO workingSet_old;
                CREATE TABLE workingSet (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    weight NUMERIC NOT NULL,
                    reps INTEGER NOT NULL,
                    setNumber INTEGER NOT NULL,
                    restAfter NUMERIC DEFAULT 0 NOT NULL,
                    rir INTEGER,
                    realizedExercise_id INTEGER NOT NULL REFERENCES realizedExercise(id) ON DELETE CASCADE
                );
                INSERT INTO workingSet (id, weight, reps, setNumber, restAfter, rir, realizedExercise_id)
                SELECT id, weight, reps, setNumber, restAfter, rir, realizedExercise_id FROM workingSet_old;
                DROP TABLE workingSet_old;
                PRAGMA foreign_keys = 1;
            `);
        }
    }
];

export async function runMigrations(db: SQLite.SQLiteDatabase) {

    if (__DEV__) {
        await db.execAsync(`DROP TABLE IF EXISTS workingSet`);
        await db.execAsync(`DROP TABLE IF EXISTS workingSet_old`);
        await db.execAsync(`DROP TABLE IF EXISTS realizedExercise`);
        await db.execAsync(`DROP TABLE IF EXISTS realizedExercise_old`);
        await db.execAsync(`DROP TABLE IF EXISTS exercise`)
        await db.execAsync(`DROP TABLE IF EXISTS routine`);
        await db.execAsync(`DROP TABLE IF EXISTS workoutSession`)
        await db.execAsync(`DROP TABLE IF EXISTS workoutSession_old`)
        await db.execAsync(`DROP TABLE IF EXISTS tag`);
        await db.execAsync(`PRAGMA user_version = 0`);
    }    

    //await db.execAsync(`DELETE FROM workoutSession WHERE routine_id = 0`);

    console.log("Running migrations");

    const [{user_version}] = await db.getAllAsync<{user_version: number}>(`PRAGMA user_version;`);

    let current_version = user_version ? user_version : 0;

    for (const migration of migrations) {

        if (migration.version > current_version) {
            console.log(`Running migration ${migration.version}: ${migration.description}`);
            await migration.up(db);
            await db.execAsync(`PRAGMA user_version = ${migration.version};`);
            current_version = migration.version;
        }

    }

    console.log(`Current migration version: ${current_version}`)

}