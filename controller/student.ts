import { application, type Request, type Response } from "express";
import { UserModel, ApplicationModel } from "../db/model";
import { APIError, decodeJWT, makeAPIResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export const createApplication = async (req: Request, res: Response) => {
    const { studentNumber, link } = req.body;

    const student = await UserModel.findOne({ studentNumber }).select(
        "studentNumber firstName lastName email middleName adviser"
    );

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

    const adviser = await UserModel.findOne({ _id: student.adviser }).select(
        "firstName middleName lastName email username"
    );

    const existingApplication = await ApplicationModel.find({
        "createdBy.studentNumber": student.studentNumber,
        status: "open",
    });

    if (existingApplication)
        throw new APIError(
            { studentNumber: "User already has an existing application." },
            StatusCodes.BAD_REQUEST
        );

    if (!adviser)
        throw new APIError(
            { adviser: "Adviser does not exist." },
            StatusCodes.BAD_REQUEST
        );

    const application = new ApplicationModel({
        previousSubmissions: [],
        step: 1,
        createdBy: {
            firstName: student.firstName,
            lastName: student.lastName,
            middleName: student.middleName,
            email: student.email,
            studentNumber: student.studentNumber,
        },
        adviser: adviser,
        submission: { link, date: new Date(), remarks: [], stepSubmitted: 1 },
        status: "open",
    });

    await application.save();

    student.application = application._id;

    await student.save({ validateModifiedOnly: true });

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully created an application on user.",
                StatusCodes.OK
            )
        );
};

export const resubmitApplication = async (req: Request, res: Response) => {
    const token = req.cookies["token-id"];

    const decoded = decodeJWT(token);

    const { link, remark } = req.body;

    const user = await UserModel.findOne({ _id: decoded.id }).select(
        "studentNumber"
    );

    if (!user)
        throw new APIError(
            { user: "User does not exist." },
            StatusCodes.UNAUTHORIZED
        );

    const application = await ApplicationModel.findOne({
        "createdBy.studentNumber": user.studentNumber,
        status: "open",
    });

    if (!application)
        throw new APIError(
            { user: "User does not have an existing application." },
            StatusCodes.BAD_REQUEST
        );

    switch (application.step) {
        case 1:
        case 2:
            application.previousSubmissions.push(application.submission);
            application.submission = {
                link,
                date: new Date(),
                remarks: [],
                stepSubmitted: application.step,
            };
            application.step = 1;
            break;
        case 3:
        case 4:
            application.submission.remarks.push({
                stepSubmitted: application.step,
                remark,
                date: new Date(),
            });
            application.step = 1;
            break;
    }

    await application.save();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully resubmitted application.",
                StatusCodes.OK
            )
        );
};

export const getStudent = async (req: Request, res: Response) => {
    const token = req.cookies["token-id"];

    const decoded = decodeJWT(token);

    const student = await UserModel.findOne(
        { _id: decoded.id },
        "-password -email -studentNumber -firstName -lastName -middleName -userType -name"
    );

    if (!student)
        throw new APIError(
            { studentNumber: "Student does not exist." },
            StatusCodes.NOT_FOUND
        );

    const data: any = { verified: student.verified };

    if (student.adviser) {
        const adviser = await UserModel.findOne({
            _id: student.adviser,
        }).select("firstName lastName middleName username email");

        data["adviser"] = adviser;
    }

    if (student.application) {
        const application = await ApplicationModel.findOne(
            {
                _id: student.application,
            },
            "-previousSubmissions"
        );

        data["application"] = application;
    }

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                data,
                "Successfully fetched student data.",
                StatusCodes.OK
            )
        );
};

export const deleteApplication = async (req: Request, res: Response) => {
    const token = req.cookies["token-id"];

    const decoded = decodeJWT(token);

    const user = await UserModel.findOne({ _id: decoded.id });

    if (!user)
        throw new APIError(
            { user: "User does not exist." },
            StatusCodes.BAD_REQUEST
        );

    user.application = undefined;

    await user.save({ validateModifiedOnly: true });

    const application = await ApplicationModel.findOne({
        "createdBy.studentNumber": user.studentNumber,
        status: "open",
    });

    if (!application)
        throw new APIError(
            { application: "There's no existing application." },
            StatusCodes.BAD_REQUEST
        );

    application.status = "closed";

    await application.save();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully deleted application.",
                StatusCodes.OK
            )
        );
};
