import * as SQLite from 'expo-sqlite';

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
];

export async function runMigrations(db: SQLite.SQLiteDatabase) {

    if (__DEV__) {
        await db.execAsync(`DROP TABLE workingSet`)
        await db.execAsync(`DROP TABLE realizedExercise`);
        await db.execAsync(`DROP TABLE exercise`)
        await db.execAsync(`DROP TABLE routine`);
        await db.execAsync(`DROP TABLE workoutSession`)
        await db.execAsync(`DROP TABLE tag`);
        await db.execAsync(`PRAGMA user_version = 0`);
    }

    console.log("Running migrations");

    const [{user_version}] = await db.getAllAsync<{user_version: number}>(`PRAGMA user_version;`);

    let current_version = user_version ? user_version : 0;

    for (const migration of migrations) {

        if (migration.version > current_version) {
            await migration.up(db);
            await db.execAsync(`PRAGMA user_version = ${migration.version};`);
            current_version = migration.version;
            console.log(`Running migration ${migration.version}: ${migration.description}`);
        }

    }

    console.log(`Current migration version: ${current_version}`)

}