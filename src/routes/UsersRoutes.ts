import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,       
} from "../controllers/user.controller";

const router: Router = Router();

router.get("/", getAllUsers);              
router.get("/:id", getUserById);            
router.post("/", createUser);               
router.put("/:id", updateUser);             
router.delete("/:id", deleteUser);
router.patch("/:id/restore", restoreUser);

export default router;
