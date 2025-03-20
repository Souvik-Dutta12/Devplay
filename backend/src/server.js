// require('dotenv').config({path: './env'})


import dotenv from 'dotenv';
// import mongoose  from 'mongoose';
// import { DB_NAME } from './constants';
import connectDB from './db/index.js';
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

try {
    connectDB()
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    })
} catch (err) {
    console.log(process.env.PORT);
    console.log("MONGO db connection failed !!! ", err);
}


/*   --:2nd way:--

import express from "express";
const app = express();

;( async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("Error",(error)=>{
            console.log("Error :", error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is running on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("Error:",error);
        throw error;
    }
})()


*/