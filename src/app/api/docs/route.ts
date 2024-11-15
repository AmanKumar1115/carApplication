import { NextResponse } from 'next/server';

export function GET() {
    const docs = {
        createUser: { method: 'POST', path: '/api/users/create', description: 'Create a new user' },
        createCar: { method: 'POST', path: '/api/cars/create', description: 'Add a new car' },
        listCars: { method: 'GET', path: '/api/cars/list', description: 'List all cars by userId' },
        getCar: { method: 'GET', path: '/api/cars/[id]', description: 'Get details of a particular car' },
        updateCar: { method: 'PATCH', path: '/api/cars/update', description: 'Update a car' },
        deleteCar: { method: 'DELETE', path: '/api/cars/delete', description: 'Delete a car' },
    };

    return NextResponse.json(docs, { status: 200 });
}
