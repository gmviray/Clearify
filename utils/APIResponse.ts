import { StatusCodes } from "http-status-codes";
import { APIResponseObject } from "../interface";

export default <T>(
    data: T,
    message: string,
    statusCode: number
): APIResponseObject<T> => {
    return {
        success:
            statusCode >= StatusCodes.CONTINUE &&
            statusCode <= StatusCodes.PERMANENT_REDIRECT,
        data,
        message,
        statusCode,
    };
};
