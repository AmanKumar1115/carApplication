import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/user.model';
import { connectMongo } from '@/utils/db';
import { IUser } from '@/models/user.model';

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        const user: Pick<IUser, 'clerkId' | 'email' | 'name'> = await req.json();
        const newUser = await User.create(user);
        return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating user:", error);
        return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
    }
}
