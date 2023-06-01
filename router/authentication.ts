import express from "express";

import {
    createApprover,
    createStudent,
    signIn,
    signOut,
} from "../controller/authentication";

const router = express.Router();

router.post("/sign-up", createStudent);

router.post("/sign-up/approver", createApprover);

router.post("/sign-in", signIn);

router.post("/sign-out", signOut);

export default router;
