import mongoose from "mongoose";

export class MongoConnection {
    private static isConnected = false;

    static async connect(): Promise<void>{
        if (this.isConnected){
            console.log('MongoDB already connected');
            return;
        }

        try{
            await mongoose.connect('mongodb://localhost:27017/auth-service');
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