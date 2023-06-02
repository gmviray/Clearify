import { StatusCodes } from "http-status-codes";

import type { Request, Response, NextFunction } from "express";

import { APIError, makeAPIResponse } from "../utils";

export default async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err.name, err.message);

    if (err instanceof APIError)
        return res
            .status(err.statusCodes)
            .json(
                makeAPIResponse(err.body, "Request failed.", err.statusCodes)
            );

    if (err.name == "ValidationError" || err.name == "MongoServerError") {
        res.status(StatusCodes.BAD_REQUEST);

        const errors = [];

        if (err.message.includes("email: Account already exists"))
            errors.push({ email: "Email is already taken." });

        if (err.message.includes("username: Account already exists"))
            errors.push({ username: "Username is already taken." });

        if (err.message.includes("studentNumber: Account already exists"))
            errors.push({
                studentNumber: "Student number is already taken.",
            });
        if (
            err.message.includes(
                "clearanceOfficer: There is already an existing clearance officer."
            )
        )
            errors.push({
                clearanceOfficer:
                    "There is already an existing clearance officer.",
            });

        return res.json(
            makeAPIResponse(
                errors,
                "Failed to create an account",
                StatusCodes.BAD_REQUEST
            )
        );
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false });
};
