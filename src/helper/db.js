import mongoose from "mongoose";
import {User} from "../models/user"

const config = {
    isConnected:0,
};

export async function connectDb(){
    if(config.isConnected){
        return; 
    }
    
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName:"todo_app",
        });
        config.isConnected = connection.readyState;
    }catch(error){
        console.log("Connection Failed")
        console.log(error)
    };
};