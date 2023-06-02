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
        validate: {
            validator: async function (value: string) {
                const existingUser = await model("user").findOne({
                    email: value,
                });
                return !existingUser;
            },
            message: "Account already exists",
        },
    },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    middleName: String,
    studentNumber: {
        type: String,
        validate: {
            validator: async function (value: string) {
                if (!value) return false;
                const existingUser = await model("user").findOne({
                    studentNumber: value,
                });
                return !existingUser;
            },
            message: "Account already exists",
        },
    },
    username: {
        type: String,
        validate: {
            validator: async function (value: string) {
                if (!value) return false;
                const existingUser = await model("user").findOne({
                    username: value,
                });
                return !existingUser;
            },
            message: "Account already exists",
        },
    },
    application: Types.ObjectId,
    adviser: Types.ObjectId,
    clearanceOfficer: {
        type: Boolean,
        validate: {
            validator: async function (_: string) {
                const user = await model("user").findOne({
                    clearanceOfficer: true,
                });

                if (user) return false;

                return true;
            },
            message: "There is already an existing clearance officer.",
        },
    },
});

UserSchema.index(
    { studentNumber: 1, username: 1 },
    {
        unique: true,
        partialFilterExpression: {
            studentNumber: { $exists: true },
            username: { $exists: true },
        },
    }
);

UserSchema.virtual("fullName").get(function () {
    // virtual full name account
    return `${
        this.firstName
    } ${this.middleName ? this.middleName : ""} ${this.lastName}`;
});

UserSchema.pre("save", async function () {
    // hash password during creation
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
    return jwt.sign(
        { id: this._id, userType: this.userType },
        config.jwtSecret,
        {
            expiresIn: config.jwtLifetime,
        }
    );
};

export default model<IUser>("user", UserSchema);
