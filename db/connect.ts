import mongoose from "mongoose";

const connectDB = async (url: string) => {
    try {
        await mongoose.connect(url);
        console.log("Successfully connected to MongoDB server!");
    } catch (err) {
        throw new Error("Failed to connect to the MongoDB server!");
    }
};

export default connectDB;
