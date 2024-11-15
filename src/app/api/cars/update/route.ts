import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';
import { ICar } from '@/models/car.model';

export async function PATCH(req: NextRequest) {
    try {
        await connectMongo();
        const { id, ...updates }: { id: string; updates: Partial<ICar> } = await req.json();
        const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedCar) {
            return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedCar }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error updating car:", error);
        return NextResponse.json({ success: false, error: "Failed to update car" }, { status: 500 });
    }
}
