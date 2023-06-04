import { Router } from "express";
import { studentMiddleware } from "../middleware";
import {
    createApplication,
    deleteApplication,
    getStudent,
    resubmitApplication,
} from "../controller/student";

const router = Router();

router.get("/student", studentMiddleware, getStudent);
router
    .route("/application")
    .post(studentMiddleware, createApplication)
    .patch(studentMiddleware, resubmitApplication)
    .delete(studentMiddleware, deleteApplication);

export default router;
