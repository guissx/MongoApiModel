import { Router } from "express";
import { getAllExamples, createExample } from "../controllers/example.controller";

const router: Router = Router();

router.use("/getexemple", getAllExamples);
router.use("/postExemple", createExample);

export default router;
