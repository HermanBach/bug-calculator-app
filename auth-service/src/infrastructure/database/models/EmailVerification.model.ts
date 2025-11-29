import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);