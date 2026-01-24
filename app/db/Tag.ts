import { getDb } from './global';

// React usage type

export type Tag = {
    id?: number;
    name: string;
};

export async function getTagById(id: number) {

    const db = await getDb();

    const tag: Tag | null = await db.getFirstAsync<Tag>(`
        SELECT * FROM tag AS t WHERE t.id = ?;
    `, id);

    return tag;
}

