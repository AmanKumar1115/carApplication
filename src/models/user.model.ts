import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    clerkId: string;
    email: string;
    name: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
}, { timestamps: true });

// Create or retrieve the User model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
