interface APIResponseObject<Type> {
    success: boolean;
    data: Type;
    message: string;
    statusCode: number;
}

export { APIResponseObject };
