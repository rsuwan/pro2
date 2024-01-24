import mongoose, { Schema, model } from "mongoose";

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: [true, "Post ID is required"],
  },
  user_email: {
    type: String,
    required: [true, "User email is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
}, {
  timestamps: true,
});

commentSchema.virtual('post', {
  ref: 'Post',
  localField: 'post_id',
  foreignField: '_id',
  justOne: true
});

const commentModel = mongoose.models.Comment || model("Comment", commentSchema);
export default commentModel;
