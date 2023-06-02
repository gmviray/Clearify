import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware";
import {
    rejectAccount,
    verifyAccount,
    createApprover,
    getPendingStudents,
    assignAdviser,
    assignAdvisers,
} from "../controller/admin";

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/sign-up/approver", createApprover);

router.post("/student/verify", verifyAccount);

router.post("/student/reject", rejectAccount);

router.post("/student/assign-adviser", assignAdviser);

router.post("/students/assign-adviser", assignAdvisers);

router.get("/students/pending", getPendingStudents);

// router.post("/admin", createAdmin);

export default router;
