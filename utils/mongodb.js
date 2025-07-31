import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    console.log(12313)
    // if (cached.conn) {
    //     return cached.conn;
    // }

    // if (!cached.promise) {
    if (true) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });

        console.log(456)
    }

    console.log(process.env.MONGODB_URI)

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;