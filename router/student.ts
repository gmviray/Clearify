import { Router } from "express";
import { authMiddleware, studentMiddleware } from "../middleware";
import { createApplication } from "../controller/student";

const router = Router();

router.use(authMiddleware);
router.use(studentMiddleware);

router.post("/student/application", createApplication);

export default router;
