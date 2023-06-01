import express from "express";

import { createStudent, signIn } from "../controller/authentication";

const router = express.Router();

router.post("/sign-up", createStudent);

router.post("/sign-in", signIn);

router.post("/logout");

export default router;
