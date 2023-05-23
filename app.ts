import express, { Request, Response } from "express";

const app: express.Application = express();

app.use("/api", (_: Request, res: Response) => {
    res.status(200).send("Hello World");
});

export default app;
