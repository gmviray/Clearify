import express, { Request, Response } from "express";

import "express-async-errors";

// Routers
import { AuthRouter } from "./router";
import errorMiddleware from "./middleware/errorMiddleware";

const app: express.Application = express();

app.use(express.json());

app.use("/api", AuthRouter);

app.get("/api", (_: Request, res: Response) => {
    res.status(200).send("Hello World");
});

app.use(errorMiddleware);

export default app;
