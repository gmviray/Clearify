interface APIResponseObject<Type> {
    success: boolean;
    data?: Type;
    errors?: Type;
    message: string;
    statusCode: number;
}

export { APIResponseObject };
