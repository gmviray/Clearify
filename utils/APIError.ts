class APIError extends Error {
    statusCodes: number;
    body: Array<{ [key: string]: string }> | string | { [key: string]: string };
    constructor(
        message:
            | Array<{ [key: string]: string }>
            | string
            | { [key: string]: string },
        statusCodes: number
    ) {
        super();
        this.body = message;
        this.statusCodes = statusCodes;
    }
}

export default APIError;
