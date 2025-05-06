import { Request, Response } from "express";
import { Workout } from "../models/WorkoutModel";

// CREATE
export const createWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title, date, exercises } = req.body;

    const workout = new Workout({
      userId,
      title,
      date: date || new Date(),
      exercises
    });

    const savedWorkout = await workout.save();
    res.status(201).json({
      success: true,
      data: savedWorkout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar workout",
      error: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
};

// GET ALL BY USER
export const getUserWorkouts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    const workouts = await Workout.find({ userId })
      .sort({ date: -1 })
      .exec();

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar workouts",
      error: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
};

// GET BY ID
export const getWorkoutById = async (req: Request, res: Response): Promise<void> => {
  try {
    const workout = await Workout.findById(req.params.id).exec();

    if (!workout) {
      res.status(404).json({
        success: false,
        message: "Workout não encontrado"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar workout",
      error: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
};

// UPDATE
export const updateWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, date, exercises } = req.body;
    
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        date, 
        exercises,
        updatedAt: new Date() 
      },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedWorkout) {
      res.status(404).json({
        success: false,
        message: "Workout não encontrado"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedWorkout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar workout",
      error: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
};

// DELETE
export const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id).exec();

    if (!deletedWorkout) {
      res.status(404).json({
        success: false,
        message: "Workout não encontrado"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Workout deletado com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao deletar workout",
      error: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
};