import mongoose from "mongoose";

export class MongoConnection {
    private static isConnected = false;

    static async connect(): Promise<void>{
        if (this.isConnected){
            console.log('MongoDB already connected');
            return;
        }

        const dbUrl = process.env.DATABASE_URL;

        if (!dbUrl){
            throw new Error('❌ DATABASE_URL is not defined in environment variables');
        }

        try{
            await mongoose.connect(dbUrl);
            this.isConnected = true;
            console.log('✅ MongoDB connected successfully')
        } catch (error){
            console.error('❌ MongoDB connection failed:', error);
            throw error;
        }
    }

    static async disconnect(): Promise<void>{
        if (this.isConnected){
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('MongoDB disconnected');
        }
    }
}