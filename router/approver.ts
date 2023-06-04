import { Router } from "express";
import {
    approveApplication,
    getApplication,
    getPendingAdviserApplications,
    getPendingOfficerApplications,
    rejectApplication,
} from "../controller/approver";
import { approverMiddleware } from "../middleware";

const router = Router();

router.get(
    "/officer/pending",
    approverMiddleware,
    getPendingOfficerApplications
);

router.get(
    "/adviser/pending",
    approverMiddleware,
    getPendingAdviserApplications
);

router.get("/application/:id", approverMiddleware, getApplication);
router.post("/application/approve", approverMiddleware, approveApplication);
router.post("/application/reject", approverMiddleware, rejectApplication);

export default router;
