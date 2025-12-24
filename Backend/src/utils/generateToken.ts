import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES } from '../config/jwt.js';

export const generateToken = (user: any) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );
};