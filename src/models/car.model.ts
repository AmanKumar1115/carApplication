import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICar extends Document {
    userId: string;               // Reference to the user's Clerk ID
    title: string;
    description: string;
    tags: string[];
    carType: string;
    company: string;
    dealer: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CarSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, ref: 'User' },  // Reference to User by Clerk ID
        title: { type: String, required: true },
        description: { type: String, required: true },
        tags: [{ type: String }],
        carType: { type: String },
        company: { type: String },
        dealer: { type: String },
        images: [{ type: String, max: 10 }],
    },
    { timestamps: true }   // Automatically manages createdAt and updatedAt fields
);

export const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);
