import * as SQLite from 'expo-sqlite';

type Migration = {
    version: number;
    up: (db: SQLite.SQLiteDatabase) => Promise<void>;
};

const migrations: Migration[] = [
    {
        version: 1,
        up: async (db) => {
            await db.execAsync(`
                CREATE TABLE routines (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT
                );
            `);
        },
    },
];

export async function runMigrations(db: SQLite.SQLiteDatabase) {

    const user_version = await db.getFirstAsync<number>(`PRAGMA user_version;`);

    let current_version = user_version ? user_version : 0;

    for (const migration of migrations) {

        if (migration.version > current_version) {
            await migration.up(db);
            await db.execAsync(`PRAGMA user_version = ${migration.version};`);
            current_version = migration.version;
        }

    }

}