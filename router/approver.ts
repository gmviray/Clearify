import { Router } from "express";
import {
    getApplication,
    getPendingAdviserApplications,
    getPendingOfficerApplications,
    rejectApplication,
} from "../controller/approver";
import { approverMiddleware, authMiddleware } from "../middleware";

const router = Router();

router.use(authMiddleware);
router.use(approverMiddleware);

router.get("/officer/pending", getPendingOfficerApplications);
router.get("/adviser/:id/pending", getPendingAdviserApplications);
router.get("/application/:id", getApplication);
router.post("/application/:id", rejectApplication);

export default router;
