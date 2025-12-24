// Backend/src/middleware/auth.middleware.ts

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import User from "../models/User.model.js";

export const getUserFromToken = async (token?: string) => {
    if (!token) return null;

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        return user;
    } catch {
        return null;
    }
};
