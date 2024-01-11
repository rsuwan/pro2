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
<<<<<<< HEAD
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
=======
    created_by: {
        type: Types.ObjectId,ref:'Admin'
    },
    cover_image: {
        type: Object,

    },{
>>>>>>> 55735e5d8e2a81963ce6e1047e9ed7891dc7d16d

    timestamps:true,
})
const Community = mongoose.model("Community", communitySchema);

export default Community;
