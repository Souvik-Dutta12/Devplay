import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String, //cloudinary url
            required: true,
        },
        thumbnail:{
            type: String, //cloudinary url
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        tags:[{
            type: String,
            default:""
        }],

        duration:{
            type: Number, //cloudinary url
            required: true,
        },
        views:{
            type: Number,
            default: 0,
        },
        isPublished:{
            type: Boolean,
            default: true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        likes:[
            {
                type:Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        dislikes:[
            {
                type:Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments:[
            {
                type:Schema.Types.ObjectId,
                ref:"User"
            }
        ]

    },
    {timestamps: true}
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema)