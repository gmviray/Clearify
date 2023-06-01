import { StatusCodes } from "http-status-codes";

import type {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";

import { ValidationError } from "yup";
import { APIResponseObject } from "../interface";
import { APIError } from "../utils";

export default async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof APIError)
        return res.status(err.statusCodes).json(err.body);

    if (err.name == "ValidationError") {
        return res.status(StatusCodes.BAD_REQUEST).json(err.message);
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false });
};
