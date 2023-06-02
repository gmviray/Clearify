import type { Request, Response } from "express";
import { UserModel } from "../db/model";
import { APIError, makeAPIResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export const verifyAccount = async (req: Request, res: Response) => {
    const { studentNumber } = req.body;

    const user = await UserModel.updateMany(
        { studentNumber },
        { verified: true }
    );

    if (!user.matchedCount)
        throw new APIError(
            { email: "Account does not exist." },
            StatusCodes.BAD_REQUEST
        );

    if (!user.modifiedCount)
        throw new APIError(
            { email: "Account is already verified." },
            StatusCodes.BAD_REQUEST
        );

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully verified account.",
                StatusCodes.OK
            )
        );
};

export const rejectAccount = async (req: Request, res: Response) => {
    const { studentNumber } = req.body;

    const user = await UserModel.findOne({ studentNumber });

    if (!user)
        throw new APIError(
            { email: "Account does not exist." },
            StatusCodes.BAD_REQUEST
        );

    // delete account
    await user.deleteOne();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully rejected account.",
                StatusCodes.OK
            )
        );
};

export const createAdmin = async (_: Request, res: Response) => {
    const user = new UserModel({
        firstName: "Renz",
        lastName: "Tegrado",
        userType: "admin",
        password: "Secret123",
        email: "renzadmin@up.edu.ph",
    });

    await user.save();
};

export const createApprover = async (req: Request, res: Response) => {
    // destructure data from request body
    const {
        firstName,
        middleName,
        lastName,
        username,
        email,
        password,
        clearanceOfficer,
    } = req.body;

    // VALIDATING DATA
    const errors: Array<{ [key: string]: string }> = [];

    const emailPattern = new RegExp("^[a-z0-9]+@up.edu.ph$");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!firstName) errors.push({ firstName: "Please indicate a first name." });
    if (!lastName) errors.push({ lastName: "Please indicate a last name." });
    if (!username) errors.push({ username: "Please indicate a username." });
    if (!email) errors.push({ email: "Please indicate an email." });
    else {
        if (!emailPattern.test(email))
            errors.push({ email: "Please indicate a valid UP email." });
    }
    if (!password) errors.push({ password: "Please indicate a password." });
    else {
        if (password.length !== 8 && !passwordRegex.test(password))
            errors.push({ password: "Please indicate a valid password." });
    }

    if (errors.length) throw new APIError(errors, StatusCodes.BAD_REQUEST);

    const user = new UserModel({
        firstName,
        middleName: middleName ? middleName : null,
        lastName,
        email,
        username,
        password,
        userType: "approver",
        clearanceOfficer,
        verified: true,
    });

    await user.save();

    return res
        .status(StatusCodes.CREATED)
        .json(
            makeAPIResponse(
                {},
                "Successfully created a new approver account!",
                StatusCodes.CREATED
            )
        );
};

export const getPendingStudents = async (req: Request, res: Response) => {
    const unverifiedStudents = await UserModel.find({
        verified: false,
        userType: "student",
    }).select("studentNumber firstName middleName lastName email");

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                unverifiedStudents,
                "Successfully fetched unverified students",
                StatusCodes.OK
            )
        );
};

export const assignAdviser = async (req: Request, res: Response) => {
    const { studentNumber, username } = req.body;

    const adviser = await UserModel.findOne({ username });

    if (!adviser)
        throw new APIError(
            { adviser: "Approver account does not exist." },
            StatusCodes.BAD_REQUEST
        );

    const student = await UserModel.updateOne(
        { studentNumber },
        { adviser: adviser._id }
    );

    if (!student.modifiedCount)
        throw new APIError(
            {
                studentNumber: `Failed to update adviser of student ${studentNumber}.`,
            },
            StatusCodes.BAD_REQUEST
        );

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully assigned a student to an adviser.",
                StatusCodes.OK
            )
        );
};

export const assignAdvisers = async (req: Request, res: Response) => {
    const { data }: { data: { studentNumber: string; username: string }[] } =
        req.body;

    const errors = [];

    for (const { studentNumber, username } of data) {
        const adviser = await UserModel.findOne({ username });

        if (!adviser) {
            errors.push({
                adviser: `Failed to assign adviser to student ${studentNumber}, because adviser ${username} does not exist.`,
            });
            continue;
        }
        const student = await UserModel.updateOne(
            { studentNumber },
            { adviser: adviser._id }
        );

        if (!student.modifiedCount)
            errors.push({
                studentNumber: `Failed to update adviser of student ${studentNumber}.`,
            });
    }

    res.status(StatusCodes.OK);

    if (errors.length)
        return res.json(
            makeAPIResponse(
                { errors: errors },
                "Failed to assign adviser to some of the students due to the following errors.",
                StatusCodes.OK
            )
        );

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully assigned a student to an adviser.",
                StatusCodes.OK
            )
        );
};

export const getStudents = async (req: Request, res: Response) => {
    const { name } = req.query;

    const query: { verified: boolean; userType: "student"; name?: any } = {
        verified: true,
        userType: "student",
    };

    if (name) query["name"] = { $regex: `^.*${name}.*$`, $options: "i" };

    const students = await UserModel.find(query).select(
        "studentNumber firstName middleName lastName email adviser"
    );

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                students,
                "Successfully fetched students",
                StatusCodes.OK
            )
        );
};

export const getAdviserNames = async (req: Request, res: Response) => {
    const advisers = await UserModel.find({
        verified: true,
        userType: "approver",
        clearanceOfficer: null,
    }).select("username firstName middleName lastName");

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                advisers,
                "Successfully fetched list of adviser names.",
                StatusCodes.OK
            )
        );
};

export const getApprovers = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json(
        makeAPIResponse(
            await UserModel.find({
                userType: "approver",
            }).select(
                "username firstName middleName lastName email clearanceOfficer"
            ),
            "Successfully fetched list of approvers.",
            StatusCodes.OK
        )
    );
};

export const deleteApprover = async (req: Request, res: Response) => {
    const username = req.params.username;

    const approver = await UserModel.findOne({
        userType: "approver",
        username,
    });

    if (!approver)
        throw new APIError(
            { username: "User does not exist." },
            StatusCodes.BAD_REQUEST
        );

    // set advisers of students to null
    await UserModel.updateMany({ adviser: approver._id }, { adviser: null });

    await approver.deleteOne();

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                `Successfully deleted account of ${username}.`,
                StatusCodes.OK
            )
        );
};

export const editApprover = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        email,
        middleName,
        clearanceOfficer,
        password,
    } = req.body;

    const approver = await UserModel.findOne({ email });

    if (!approver)
        throw new APIError(
            { email: "Account does not exists." },
            StatusCodes.BAD_REQUEST
        );

    if (firstName) approver.firstName = firstName;
    if (middleName) approver.middleName = middleName;
    if (lastName) approver.lastName = lastName;
    if (password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

        if (!passwordRegex.test(password))
            throw new APIError(
                { password: "Invalid password" },
                StatusCodes.BAD_REQUEST
            );
        approver.password = password;
    }
    if (clearanceOfficer) approver.clearanceOfficer = clearanceOfficer;

    await approver.save({ validateModifiedOnly: true });

    return res
        .status(StatusCodes.OK)
        .json(
            makeAPIResponse(
                {},
                "Successfully edited approver account",
                StatusCodes.OK
            )
        );
};
