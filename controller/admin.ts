import type { Request, Response } from "express";
import { UserModel } from "../db/model";
import { APIError, makeAPIResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export const verifyAccount = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user)
        throw new APIError(
            { email: "Account does not exist." },
            StatusCodes.BAD_REQUEST
        );

    user.verified = true;

    await user.save();

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
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

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
            makeAPIResponse({}, "Successfully deleted account.", StatusCodes.OK)
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
