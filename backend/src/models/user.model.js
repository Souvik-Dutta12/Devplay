import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {   
        username:{
            type:String,
            required:true,
            lowercase : true,
            unique : true
        },
        description:{
            type: String,
        },
        channelName:{
            type:String,
            required:true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        avatar:{
            type: String,  //cloudinary url
            default:""
        },
        coverImage:{
            type:String,
            default: ""
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
        ],
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        refreshToken: {
            type: String,
        }
        
    }
    ,{timestamps: true}
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();


})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d'
        }
    )
}
export const User = mongoose.model("User", userSchema);