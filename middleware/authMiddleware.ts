import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { APIError } from "../utils";

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["token-id"];

    if (!token)
        throw new APIError(
            "Request is not authenticated.",
            StatusCodes.UNAUTHORIZED
        );
    next();
};
