import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const car = await Car.findById(params.id);
        if (!car) {
            return NextResponse.json({ success: false, error: 'Car not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: car }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
