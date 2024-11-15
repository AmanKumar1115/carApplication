import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connect } from '@/utils/db';
import { ICar } from '@/models/car.model';

connect();
export async function POST(req: NextRequest) {
    try {
        const carData: Pick<ICar, 'userId' | 'title' | 'description' | 'tags' | 'carType' | 'company' | 'dealer' | 'images'> = await req.json();
        console.log(carData);
        const newCar = await Car.create(carData);
        return NextResponse.json({ success: true, data: newCar }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating car:", error);
        return NextResponse.json({ success: false, error: "Failed to create car" }, { status: 500 });
    }
}
