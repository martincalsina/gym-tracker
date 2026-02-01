import * as SQLite from 'expo-sqlite';
import { CreateExerciseData } from "../model/Exercise";


export const DEFAULT_EXERCISES: CreateExerciseData[] = [
  {
    name: "Barbell Bench Press",
    description: "Chest",
    cover: "barbell-bench-press.png",
  },
  {
    name: "Chin Ups",
    description: "Back",
    cover: "chin-ups.png",
  },
  {
    name: "Conventional Deadlift",
    description: "Glutes & Hamstrings & Lower Back",
    cover: "conventional-deadlift.png",
  },
  {
    name: "Barbell Squat",
    description: "Quads & Glutes",
    cover: "barbell-squat.png",
  },
  {
    name: "Barbell Biceps Curl",
    description: "Biceps",
    cover: "barbell-biceps-curl.png",
  },
  {
    name: "Cable Abs Crunch",
    description: "Abs",
    cover: "cable-abs-crunch.png",
  },
  {
    name: "Calves Raises",
    description: "Calves",
    cover: "calves-raises.png",
  },
  {
    name: "Smith Machine Squat",
    description: "Quads & Glutes",
    cover: "smith-machine-squat.png",
  },
  {
    name: "Layed Hamstring Curl",
    description: "Hamstrings",
    cover: "layed-hamstring-curl.png",
  },
  {
    name: "Dips",
    description: "Chest",
    cover: "dips.png",
  },
  {
    name: "Cable Rear Delt Fly",
    description: "Rear Delts",
    cover: "cable-rear-delt-fly.png",
  },
  {
    name: "Cable Lateral Raises",
    description: "Lateral Delts",
    cover: "cable-lateral-raises.png",
  },
  {
    name: "Stiff Legs Deadlift",
    description: "Glutes & Hamstrings",
    cover: "stiff-legs-deadlift.png",
  },
  {
    name: "Incline Bench Press",
    description: "Chest",
    cover: "incline-bench-press.png",
  },
  {
    name: "Overhead Cable Triceps Extensions",
    description: "Triceps",
    cover: "overhead-cable-triceps-extension.png",
  },
];


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
