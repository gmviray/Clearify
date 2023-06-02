import { StatusCodes } from "http-status-codes";
import { APIResponseObject } from "../interface";

export default <T>(
    data: T,
    message: string,
    statusCode: number
): APIResponseObject<T> => {
    const success =
        statusCode >= StatusCodes.CONTINUE &&
        statusCode <= StatusCodes.PERMANENT_REDIRECT;

    if (!success) return { success, errors: data, message, statusCode };

    return {
        success,
        data,
        message,
        statusCode,
    };
};
