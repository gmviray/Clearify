import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware";
import {
    rejectAccount,
    verifyAccount,
    createApprover,
} from "../controller/admin";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/sign-up/approver", createApprover);

router.post("/student/verify", verifyAccount);

router.post("/student/reject", rejectAccount);

// router.post("/admin", createAdmin);

export default router;
