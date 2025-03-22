import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        // console.log(`${ connectionInstance.Connection}`)
        console.log(`\nMONGODB connected !!`);
    } catch (error) {
        console.log("Attempting to reconnect")
        console.log("MONGODB connection FAILED ", error);

    }
}

export default connectDB 