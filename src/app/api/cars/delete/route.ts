import { NextRequest, NextResponse } from 'next/server';
import { Car } from '@/models/car.model';
import { connectMongo } from '@/utils/db';

export async function DELETE(req: NextRequest) {
    try {
        await connectMongo();
        const { id } = await req.json();
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return NextResponse.json({ success: false, error: 'Car not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Car deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
