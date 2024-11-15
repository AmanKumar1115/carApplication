import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/user.model';
import { connectMongo } from '@/utils/db';

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        const { clerkId, email, name } = await req.json();

        const newUser = await User.create({ clerkId, email, name });
        return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
