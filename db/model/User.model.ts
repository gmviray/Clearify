import { Schema, model, Document, Types } from "mongoose";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    middleName?: string;
    studentNumber?: string;
    username?: string;
    application?: Types.ObjectId;
    adviser?: Types.ObjectId;
    clearanceOfficer?: boolean;
    correctPassword(candidatePassword: string): Promise<boolean>;
    createJWT(): string;
}

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    middleName: String,
    studentNumber: { type: String, unique: true },
    username: { type: String, unique: true },
    application: Types.ObjectId,
    adviser: Types.ObjectId,
    clearanceOfficer: { type: Boolean },
});

UserSchema.virtual("fullName").get(function () {
    return `${
        this.firstName
    } ${this.middleName ? this.middleName : ""} ${this.lastName}`;
});

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.correctPassword = async function (
    candidatePassword: string
) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id }, config.jwtSecret, {
        expiresIn: config.jwtLifetime,
    });
};

export default model<IUser>("user", UserSchema);
