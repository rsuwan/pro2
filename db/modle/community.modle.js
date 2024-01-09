// community.modle.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const communitySchema = new Schema({
    community_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creater_email: {
        type: String,
        // required: true
    },
    created_date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    cover_image: {
        type: Object,
    },

},{

    timestamps:true,
})
const Community = mongoose.model("Community", communitySchema);

export default Community;
