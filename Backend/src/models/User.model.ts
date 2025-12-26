// Backend/src/models/User.model.ts

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["ADMIN", "SELLER", "USER"],
            default: "USER",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
