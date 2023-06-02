import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
dotenv.config();

const getConfig = (title: string) => {
    if (process.env[title]) return process.env[title];

    throw new Error(`${title} missing from environment variables.`);
};

export default {
    port: getConfig("PORT"),
    mongodb: getConfig("MONGODBURL"),
    jwtSecret: getConfig("JWT_SECRET") as Secret,
    jwtLifetime: getConfig("JWT_LIFETIME"),
};
