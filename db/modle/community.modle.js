
import mongoose, { Schema, model } from "mongoose";

const communitySchema = new Schema({
  community_name: {
    type: String,
    required: [true, "Community name is required"],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: Object,
    required: [true, "Image is required"],
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "InActive"],
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "SuperAdmin" },
  updatedBy: { type: mongoose.Types.ObjectId, ref: "SuperAdmin" },
 /// posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
}, {
  timestamps: true,

});
communitySchema.virtual('post'),{
localFileld:'_id',
foreighField:'community_name',
ref:'Post'

}

const Community = mongoose.model("Community", communitySchema);
export default Community;
