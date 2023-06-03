import { Router } from "express";
import { authMiddleware, studentMiddleware } from "../middleware";
import { createApplication, getStudent } from "../controller/student";

const router = Router();

router.get("/student", studentMiddleware, getStudent);
router.post("/application", studentMiddleware, createApplication);

export default router;
