import { Router } from "express";

import { createStudent, signIn, signOut } from "../controller/authentication";

const router = Router();

router.post("/sign-up", createStudent);

router.post("/sign-in", signIn);

router.post("/sign-out", signOut);

// router.post("/admin", createAdmin);

export default router;
