// community.modle.js
import mongoose, { Schema, Types } from "mongoose";
const communitySchema = new Schema({
    community_name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'InActive'],
    },
    createdBy: { type: Types.ObjectId, ref: 'SuperAdmin' },
    updatedBy: { type: Types.ObjectId, ref: 'SuperAdmin' },
},
    {
        timestamps: true,
    }
);
const Community = mongoose.model("Community", communitySchema);
export default Community;
