import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware";
import {
    rejectAccount,
    verifyAccount,
    createApprover,
    getPendingStudents,
    assignAdviser,
    assignAdvisers,
    getStudents,
    getAdviserNames,
    getApprovers,
    deleteApprover,
    editApprover,
} from "../controller/admin";

const router = Router();

router.post("/sign-up/approver", adminMiddleware, createApprover);

router.post("/student/verify", adminMiddleware, verifyAccount);

router.post("/student/reject", adminMiddleware, rejectAccount);

router.post("/student/assign-adviser", adminMiddleware, assignAdviser);

router.post("/students/assign-adviser", adminMiddleware, assignAdvisers);

router.get("/students/pending", adminMiddleware, getPendingStudents);

router.get("/students/", adminMiddleware, getStudents);

router.get("/adviser-names/", adminMiddleware, getAdviserNames);

router.get("/approvers", adminMiddleware, getApprovers);

router
    .route("/approver/:username")
    .delete(adminMiddleware, deleteApprover)
    .patch(adminMiddleware, editApprover);

// router.post("/admin", createAdmin);

export default router;
