import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        // Connect to MongoDB
        await connectMongo();

        // Extract the ID from the params
        const { id } = context.params;

        // Find the car by ID
        const car = await Car.findById(id);

        // Handle not found
        if (!car) {
            return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
        }

        // Respond with the car data
        return NextResponse.json({ success: true, data: car }, { status: 200 });
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred";

        // Type-check error
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
