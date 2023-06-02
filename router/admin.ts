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

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/sign-up/approver", createApprover);

router.post("/student/verify", verifyAccount);

router.post("/student/reject", rejectAccount);

router.post("/student/assign-adviser", assignAdviser);

router.post("/students/assign-adviser", assignAdvisers);

router.get("/students/pending", getPendingStudents);

router.get("/students/", getStudents);

router.get("/adviser-names/", getAdviserNames);

router.get("/approvers", getApprovers);

router.route("/approver/:username").delete(deleteApprover).patch(editApprover);

// router.post("/admin", createAdmin);

export default router;
