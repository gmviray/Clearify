import express, { Request, Response } from "express";

import cookierParser from "cookie-parser";

import "express-async-errors";

// Routers
import {
    AdminRouter,
    ApproverRouter,
    AuthRouter,
    StudentRouter,
} from "./router";

// middleware
import { authMiddleware, errorMiddleware } from "./middleware";

const app: express.Application = express();

app.use(express.json());

app.use(cookierParser());

app.use(authMiddleware);
app.use("/api", AuthRouter);
app.use("/api", AdminRouter);
app.use("/api", StudentRouter);
app.use("/api", ApproverRouter);

app.get("/api", (_: Request, res: Response) => {
    res.status(200).send("Hello World");
});

app.use(errorMiddleware);

export default app;
