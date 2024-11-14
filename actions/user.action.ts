"use server";

import { User } from "../models/user.model";
import connectMongo from "../utils/db"
export async function createUser(user: any) {
    try {
        await connectMongo();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        await connectMongo();
        const user = await User.findOne({ clerkId });
        return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
        console.error("Error fetching user by Clerk ID:", error);
        throw new Error("Failed to fetch user");
    }
}

export async function updateUser(clerkId: string, updateData: any) {
    try {
        await connectMongo();
        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            { $set: updateData },
            { new: true }
        );
        return updatedUser ? JSON.parse(JSON.stringify(updatedUser)) : null;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}
