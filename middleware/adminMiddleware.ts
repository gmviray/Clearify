import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { APIError, decodeJWT } from "../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["token-id"];

    const decoded = decodeJWT(token);

    if (decoded.userType != "admin")
        throw new APIError(
            "Request is not allowed to access this resource.",
            StatusCodes.FORBIDDEN
        );

    next();
};
