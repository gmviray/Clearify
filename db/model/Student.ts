import { Schema, model, Types } from "mongoose";
import bcryptjs from "bcryptjs";

const StudentSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    studentNumber: { type: String, unique: true },
    password: { type: String, required: true },
    application: Types.ObjectId,
    adviser: Types.ObjectId,
    userType: { type: String, default: "student" },
});

StudentSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

StudentSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
});

StudentSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

export default model("user", StudentSchema);
