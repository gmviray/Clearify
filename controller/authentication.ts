import type { Request, Response } from "express";

import { UserModel } from "../db/model";

import { APIError, makeAPIResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import config from "../config";

export const createStudent = async (req: Request, res: Response) => {
    // destructure data from request body
    const { firstName, middleName, lastName, studentNumber, email, password } =
        req.body;

    // VALIDATING DATA
    const errors: Array<{ [key: string]: string }> = [];

    const emailPattern = new RegExp("^[a-z0-9]+@up.edu.ph$");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!firstName) errors.push({ firstName: "Please indicate a first name." });
    if (!lastName) errors.push({ lastName: "Please indicate a last name." });
    if (!studentNumber)
        errors.push({ studentNumber: "Please indicate a student number." });
    else {
        if (studentNumber.length !== 9)
            errors.push({
                studentNumber: "Please indicate a valid student number.",
            });
    }
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
        studentNumber,
        email,
        password,
        userType: "student",
        adviser: null,
        application: null,
    });

    await user.save();

    return res
        .cookie("token-id", user.createJWT(), {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: config.jwtLifetime ? +config.jwtLifetime : 0,
        })
        .status(StatusCodes.CREATED)
        .json(
            makeAPIResponse(
                {
                    firstName,
                    middleName,
                    lastName,
                    studentNumber,
                    email,
                    userType: user.userType,
                    adviser: user.adviser,
                    application: user.application,
                },
                "Successfully created a new student account!",
                StatusCodes.CREATED
            )
        );
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user)
        throw new APIError(
            { email: "User does not exist." },
            StatusCodes.BAD_REQUEST
        );

    if (!(await user.correctPassword(password)))
        throw new APIError(
            { password: "Invalid password." },
            StatusCodes.BAD_REQUEST
        );

    let message;

    if (user.userType == "student")
        message = {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            studentNumber: user.studentNumber,
            email,
            userType: user.userType,
            adviser: user.adviser,
            application: user.application,
        };
    else if (user.userType == "approver")
        message = {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            username: user.username,
            email,
            userType: user.userType,
            clearanceOfficer: user.clearanceOfficer,
        };
    else
        message = message = {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email,
            userType: user.userType,
        };

    return res
        .cookie("token-id", user.createJWT(), {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: config.jwtLifetime ? +config.jwtLifetime : 0,
        })
        .status(StatusCodes.CREATED)
        .json(
            makeAPIResponse(
                message,
                "Successfully signed in user account!",
                StatusCodes.OK
            )
        );
};
