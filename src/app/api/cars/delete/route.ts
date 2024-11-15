import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connect } from '@/utils/db';

export async function DELETE(req: NextRequest) {
    try {
        await connect();
        const { id }: { id: string } = await req.json();
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Car deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ success: false, error: "Failed to delete car" }, { status: 500 });
    }
}
