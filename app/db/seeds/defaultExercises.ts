import * as SQLite from 'expo-sqlite';
import { CreateExerciseData } from "../model/Exercise";

const DEFAULT_COVER: string = "@/assets/images/noun-squat.png";

export const DEFAULT_EXERCISES: CreateExerciseData[] = [
    {
        name: "Barbell Bench Press",
        description: "Chest",
        cover: DEFAULT_COVER,
    },
    {
        name: "Chin Ups",
        description: "Back",
        cover: DEFAULT_COVER,
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
    },
    {
        name: "Dips",
        description: "Chest",
        cover: DEFAULT_COVER
    },
    {
        name: "Cable Rear Delt Fly",
        description: "Rear Delts",
        cover: DEFAULT_COVER
    },
    {
        name: "Cable Lateral Raises",
        description: "Lateral Delts",
        cover: DEFAULT_COVER
    },
    {
        name: "Stiff Legs Deadlift",
        description: "Glutes & Hamstrings",
        cover: DEFAULT_COVER
    },
    {
        name: "Incline Bench Press",
        description: "Chest",
        cover: DEFAULT_COVER
    },
    {
        name: "Overhead Cable Triceps Extensions",
        description: "Triceps",
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
            `INSERT INTO exercise (name, description, cover, isDefault) VALUES (?, ?, ?, ?)`,
            [ex.name, ex.description, ex.cover, 1]
        );
    })
  )
    
}
