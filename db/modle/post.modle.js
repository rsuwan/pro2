import mongoose, { Schema, model } from "mongoose";
const PostSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: [true, "Uer email is required"],
  },
  community_name: {
    type: String,
    required: [true, "Community name is required"],
  },
  like: {
    type: Number,
    //required: true,
    default: 0,
  },
  mainImage: {
    type: Object,
    required: [true, "main Image is required"],
  },
  supImages: [
    {
      type: Object,
      required: [true, "sup Images is required"],
    },
  ],
  properties: [{}],
});

// module.exports = mongoose.model('Post', PostSchema);
const postModel = mongoose.models.Post || model("Post", PostSchema);
export default postModel;
