import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {   
        clerkId:{
            type: String,
            required: true,
            unique: true,
        },
        avatar:{
            type: String,  //cloudinary url
            required: true,
        },
        coverImage:{
            type: String, //cloudinary url
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        subscribers:[
            {
                type:Schema.Types.ObjectId,
                ref: "User"
            }
        ]
        
    }
    ,{timestamps: true}
);



export const User = mongoose.model("User", userSchema);