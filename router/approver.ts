import { Router } from "express";
import {
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
    "/adviser/:id/pending",
    approverMiddleware,
    getPendingAdviserApplications
);

router.get("/application/:id", approverMiddleware, getApplication);
router.post("/application/:id", approverMiddleware, rejectApplication);

export default router;
