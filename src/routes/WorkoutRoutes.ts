import { Router } from "express";
import {
  createWorkout,
  getUserWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
} from "../controllers/workout.controller";
import { authenticateToken } from "../middlewares/authmiddlewares";

const router: Router = Router();

router.post("/", authenticateToken, createWorkout);
router.get("/user/:userId", authenticateToken, getUserWorkouts);
router.get("/:id", authenticateToken, getWorkoutById);
router.put("/:id", authenticateToken, updateWorkout);
router.delete("/:id", authenticateToken, deleteWorkout);

export default router;