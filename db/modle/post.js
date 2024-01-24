import mongoose, { Schema, model } from "mongoose";

const postSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: [true, "User email is required"],
  },
  community_name: {
    type: String,
    required: [true, "Community name is required"],
  },
  like: {
    type: Number,
    default: 0,
  },
  mainImage: {
    type: Object,
    // required: [true, "Main image is required"],
  },
  supImages: [
    {
      type: Object,
      // required: [true, "Sup images are required"],
    },
  ],
  properties: [{
    type: mongoose.Types.ObjectId,
    ref: 'CommunityProperties',
  }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true,
});

const postModel = mongoose.models.Post || model("Post", postSchema);
export default postModel;
