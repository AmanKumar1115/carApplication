// import mongoose from 'mongoose';

// const connectMongo = async () => {
//     if (mongoose.connection.readyState >= 1) return;

//     return mongoose.connect(process.env.MONGODB_URI!);
// };

// export default connectMongo;
import mongoose from "mongoose";

export async function connectMongo() {
    try {
        mongoose.connect(process.env.MONGO_URI!, {
            dbName: "carApp"
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