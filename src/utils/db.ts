"use server";
import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "carapp"
        });
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (err) => {
            console.log('MongoDb connection error, please make sure db is up and running: ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB')
        console.log(error);
    }
}