import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const ApproverSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    userType: { type: String, default: "approver" },
    isClearanceOfficer: { type: Boolean, required: true },
});

ApproverSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
});

ApproverSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

export default model("user", ApproverSchema);
