import { Router } from "express";
import { authMiddleware, studentMiddleware } from "../middleware";

const router = Router();

router.use(authMiddleware);
router.use(studentMiddleware);

router.post("/student/application");

export default router;
