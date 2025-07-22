import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB Connected');
    }catch(error){
        console.log('MongoDB connection failed:', error);
        process.exit(1);
        //process.exit(1) 代表非正常結束程式，避免無法連資料庫時伺服器繼續跑 
    }
}