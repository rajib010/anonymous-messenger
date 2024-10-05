import mongoose from "mongoose";

//for prev. connection if already established
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to DB');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log(db);
        
        connection.isConnected = db.connections[0].readyState;
        console.log('Database connected Successfully');
        
    } catch (error) {
        console.log('Database connection failed', error);        
        process.exit(1)
    }
}

export default dbConnect;