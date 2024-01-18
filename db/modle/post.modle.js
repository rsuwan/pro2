import mongoose, { Schema, model } from 'mongoose'
const PostSchema = new mongoose.Schema({
    user_email: {
        type: String,
        // required: true,
    },
    community_name: {
        type: String,
        // required: true
    },
    like: {
        type: Number,
        required: true,
        default: 0,
    },
    mainImage: {
        type: Object,
        required: true,
    },
    supImages: [{
        type: Object,
        required: true,
    }],
    properties: [{

    }]
});

// module.exports = mongoose.model('Post', PostSchema);
const postModel = mongoose.models.Post || model('Post', PostSchema);
export default postModel