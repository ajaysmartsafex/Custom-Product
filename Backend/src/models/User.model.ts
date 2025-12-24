// Backend/src/models/User.model.ts

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: 'string',
    email: { type: 'string', unique: true },
    password: 'string',
    role: {
        type: 'string',
        enum: ['admin', 'seller', 'user'],
        default: 'user'
    }
})

export default mongoose.model('User', userSchema);