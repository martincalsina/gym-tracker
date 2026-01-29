import * as SQLite from 'expo-sqlite';
import { CreateExerciseData } from "../model/Exercise";

const DEFAULT_COVER: string = "https://picsum.photos/700";


export const DEFAULT_EXERCISES: CreateExerciseData[] = [
    {
        name: "Barbell Bench Press",
        description: "Chest",
        cover: DEFAULT_COVER
    },
    {
        name: "Chin Ups",
        description: "Back",
        cover: DEFAULT_COVER
    },
    {
        name: "Conventional Deadlift",
        description: "Glutes & Hamstrings & Lower Back",
        cover: DEFAULT_COVER
    },
    {
        name: "Barbell Squat",
        description: "Quads & Glutes",
        cover: DEFAULT_COVER
    },
    {
        name: "Barbell Biceps Curl",
        description: "Biceps",
        cover: DEFAULT_COVER
    },
    {
        name: "Cable Abs Crunch",
        description: "Abs",
        cover: DEFAULT_COVER
    },
    {
        name: "Calves Raises",
        description: "Calves",
        cover: DEFAULT_COVER
    },
    {
        name: "Smith Machine Squat",
        description: "Quads & Glutes",
        cover: DEFAULT_COVER
    },
    {
        name: "Layed Hamstring Curl",
        description: "Hamstrings",
        cover: DEFAULT_COVER
    }
]

export async function seedDefaultExercises(db: SQLite.SQLiteDatabase) {

  const [{ count }] = await db.getAllAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM exercise;`
  );

  if (count > 0) {
    return;
  }

  console.log("Seeding default exercises");

  await Promise.all(DEFAULT_EXERCISES.map(ex => {
        db.runAsync(
            `INSERT INTO exercise (name, description, cover) VALUES (?, ?, ?)`,
            [ex.name, ex.description, ex.cover]
        );
    })
  )
    
}
