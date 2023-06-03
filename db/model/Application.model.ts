import { Schema, model, Document, Types } from "mongoose";

type ApplicationSteps = 1 | 2 | 3 | 4 | 5;

interface Remark {
    remarkBy: {
        email: string;
        username: string;
        lastName: string;
        middleName?: string;
        firstName: string;
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
        type: Types.ObjectId,
        ref: "User",
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
    },
});

export default model<IApplicationSchema>("application", applicationSchema);
