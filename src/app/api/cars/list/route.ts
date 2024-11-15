import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connect } from '@/utils/db';

export async function GET(req: NextRequest) {
    try {
        await connect();
        const userId = req.nextUrl.searchParams.get('userId');
        const cars = await Car.find({ userId });
        return NextResponse.json({ success: true, data: cars }, { status: 200 });
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred";

        // Type-check error
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
