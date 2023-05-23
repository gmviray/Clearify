import dotenv from "dotenv";
dotenv.config();

const getConfig = (title: string) => {
    if (process.env[title]) return process.env[title];

    throw new Error(`${title} missing from environment variables.`);
};

export default {
    port: getConfig("PORT"),
    mongodb: getConfig("MONGODBURL"),
};
