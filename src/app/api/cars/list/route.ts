import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';

export async function GET(req: NextRequest) {
    try {
        await connectMongo();
        const userId = req.nextUrl.searchParams.get('userId');
        const cars = await Car.find({ userId });
        return NextResponse.json({ success: true, data: cars }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

