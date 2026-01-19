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
    }
];

export async function runMigrations(db: SQLite.SQLiteDatabase) {

    if (__DEV__) {
        await db.execAsync(`DROP TABLE routine`);
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

}