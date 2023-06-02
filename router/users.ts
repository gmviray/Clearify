import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware";

import { createApprover } from "../controller/admin";

const router = Router();

router.use(authMiddleware);

router.post("/users", getUsers);

// router.post("/admin", createAdmin);

export default router;
