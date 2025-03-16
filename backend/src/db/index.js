import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = () => {
    try {

        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log(`${ connectionInstance.Connection}`)
        console.log(`\nMONGODB connected !!`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB