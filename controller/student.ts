import type { Request, Response } from "express";
import { UserModel, ApplicationModel } from "../db/model";
import { APIError } from "../utils";
import { StatusCodes } from "http-status-codes";

export const createApplication = async (req: Request, res: Response) => {
    const { studentNumber, link } = req.body;

    const student = await UserModel.findOne({ studentNumber });

    if (!student)
        throw new APIError(
            { studentNumber: "Account does not exist." },
            StatusCodes.BAD_REQUEST
        );

    if (!student.adviser)
        throw new APIError(
            { studentNumber: "Account does not have an assigned adviser." },
            StatusCodes.BAD_REQUEST
        );

    if (student.application)
        throw new APIError(
            { studentNumber: "User already has an existing application." },
            StatusCodes.BAD_REQUEST
        );

    const application = new ApplicationModel({
        previousSubmissions: [],
        step: 1,
        createdBy: student._id,
        adviser: student.adviser,
        submission: { link, date: new Date(), remarks: [], stepSubmitted: 1 },
        status: "open",
    });

    await application.save();
};
