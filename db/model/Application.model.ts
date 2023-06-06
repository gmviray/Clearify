import { Schema, model, Document, Types } from "mongoose";

type ApplicationSteps = 1 | 2 | 3 | 4 | 5;

interface Remark {
    remarkBy?: {
        email: string;
        username: string;
        lastName: string;
        middleName?: string;
        firstName: string;
        _id: Types.ObjectId;
    };
    stepSubmitted: ApplicationSteps;
    remark: string;
    date: Date;
}

interface ApplicationSubmission {
    date: Date;
    link: string;
    stepSubmitted: ApplicationSteps;
    remarks: Remark[];
}

interface IApplicationSchema extends Document {
    status: "open" | "completed" | "closed";
    step: ApplicationSteps;
    submission: ApplicationSubmission;
    previousSubmissions: ApplicationSubmission[];
    adviser: Types.ObjectId;
    createdBy: Types.ObjectId;
    clearedBy: {
        email: String;
        username: String;
        lastName: String;
        middleName: String;
        firstName: String;
    };
}

const remarkSchema = new Schema({
    remarkBy: {
        email: String,
        username: String,
        lastName: String,
        middleName: String,
        firstName: String,
    },
    stepSubmitted: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    remark: String,
    date: Date,
});

const applicationSubmissionSchema = new Schema({
    date: Date,
    link: String,
    stepSubmitted: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    remarks: [remarkSchema],
});

const applicationSchema = new Schema({
    status: {
        type: String,
        enum: ["open", "completed", "closed"],
    },
    step: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    submission: applicationSubmissionSchema,
    previousSubmissions: [applicationSubmissionSchema],
    adviser: {
        email: String,
        username: String,
        lastName: String,
        middleName: String,
        firstName: String,
    },
    createdBy: {
        email: String,
        studentNumber: String,
        lastName: String,
        middleName: String,
        firstName: String,
    },
    clearedBy: {
        email: String,
        studentNumber: String,
        lastName: String,
        middleName: String,
        firstName: String,
    },
});

export default model<IApplicationSchema>("application", applicationSchema);
