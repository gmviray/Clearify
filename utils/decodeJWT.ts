import jwt from "jsonwebtoken";
import config from "../config";

export default (token: string) =>
    jwt.verify(token, config.jwtSecret) as {
        id: string;
        userType: string;
        iat: number;
        exp: number;
    };
