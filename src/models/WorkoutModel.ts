import { Schema, model, Document, Types } from 'mongoose';

interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

interface IWorkout extends Document {
  userId: Types.ObjectId;
  title: string;
  date: Date;
  exercises: IExercise[];
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number },
  notes: { type: String }
});

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema]
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);