import type { Request, Response } from "express";
import { ApplicationModel, UserModel } from "../db/model";
import { StatusCodes } from "http-status-codes";
import { APIError, makeAPIResponse } from "../utils";
import { Types } from "mongoose";

export const getPendingAdviserApplications = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    const pendingApplications = await ApplicationModel.find({
        step: 1,
        status: "open",
        adviser: id,
    }).select("createdBy adviser");

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                pendingApplications,
                "Successfully fetched all pending applications for adviser to review.",
                StatusCodes.OK
            )
        );
};

export const getPendingOfficerApplications = async (
    _: Request,
    res: Response
) => {
    const pendingApplications = await ApplicationModel.find({
        step: 3,
        status: "open",
    }).select("createdBy adviser");

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                pendingApplications,
                "Successfully fetched all pending applications for clearance officer to review.",
                StatusCodes.OK
            )
        );
};

export const getApplication = async (req: Request, res: Response) => {
    const { id } = req.params;

    const application = await ApplicationModel.findOne({
        _id: id,
        status: "open",
    });

    if (!application)
        throw new APIError(
            { id: "Application does not exist." },
            StatusCodes.BAD_REQUEST
        );

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                application,
                "Successfully fetched clearance application.",
                StatusCodes.OK
            )
        );
};

export const approveApplication = async (req: Request, res: Response) => {
    const { id } = req.body;

    const application = await ApplicationModel.findOne({
        _id: id,
        status: "open",
    });

    if (!application)
        throw new APIError(
            { id: "Application does not exist" },
            StatusCodes.BAD_REQUEST
        );

    switch (application.step) {
        case 1:
            application.step = 3;
            break;
        case 3:
            application.step = 5;
            application.status = "completed";
            break;
    }

    await application.save();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully approved application at the current step.",
                StatusCodes.OK
            )
        );
};

export const rejectApplication = async (req: Request, res: Response) => {
    const { id, remark, commenterUsername } = req.body;

    const application = await ApplicationModel.findOne({
        _id: id,
        status: "open",
    });

    if (!application)
        throw new APIError(
            { id: "Application does not exist" },
            StatusCodes.BAD_REQUEST
        );

    const commenter = await UserModel.findOne({
        username: commenterUsername,
    }).select("email username middleName firstName lastName");

    if (!commenter)
        throw new APIError(
            { commenterUsername: "User does not exist." },
            StatusCodes.BAD_REQUEST
        );

    application.submission.remarks.push({
        remarkBy: {
            email: commenter.email,
            username: commenter.username as string,
            firstName: commenter.firstName,
            lastName: commenter.lastName,
            middleName: commenter.middleName,
            _id: commenter._id,
        },
        stepSubmitted: application.step,
        remark,
        date: new Date(),
    });

    switch (application.step) {
        case 1:
            application.step = 2;
            break;
        case 3:
            application.step = 4;
            application.status = "completed";
            break;
    }

    await application.save();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully approved application at the current step.",
                StatusCodes.OK
            )
        );
};
