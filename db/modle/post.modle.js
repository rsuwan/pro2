import mongoose, { Schema, model } from "mongoose";

const PostSchema = new mongoose.Schema({
  user_email: {
    type: String,
    // required: [true, "User email is required"],
  },
  community_name: {
    type: String,
    required: [true, "Community name is required"],
  },
  like: {
    type: Number,
    // required: true,
    default: 0,
  },
  mainImage: {
    type: Object,
    // required: [true, "Main Image is required"],
  },
  userType: {
    type: String,
    enum: ["owner", "customer"],
    required: [true, "User type is required"],
  },
  supImages: [
    {
      type: Object,
      // required: [true, "Sup Images is required"],
    },
  ],
  properties: [{}],
});

const postModel = mongoose.models.Post || model("Post", PostSchema);
export default postModel;
