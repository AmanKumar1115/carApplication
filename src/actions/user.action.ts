"use server";

import { User } from "../models/user.model";
import { connect } from "../utils/db";
import { IUser } from "../models/user.model";

// Function to create a user
export async function createUser(user: Pick<IUser, "clerkId" | "email" | "name">) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}

// Function to fetch a user by Clerk ID
export async function getUserByClerkId(clerkId: string) {
    try {
        await connect();
        const user = await User.findOne({ clerkId });
        return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
        console.error("Error fetching user by Clerk ID:", error);
        throw new Error("Failed to fetch user");
    }
}

// Function to update a user
export async function updateUser(clerkId: string, updateData: Partial<IUser>) {
    try {
        await connect();
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
