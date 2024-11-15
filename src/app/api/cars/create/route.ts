import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        const carData = await req.json();
        const newCar = await Car.create(carData);
        return NextResponse.json({ success: true, data: newCar }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
