import mongoose, { Schema, model } from "mongoose";

const communityPropertiesSchema = new mongoose.Schema({
  community_Name: {
    type: String,
    required: [true, "Community name is required"],
  },
  property: {
    type: String,
    required: [true, "Property is required"],
  },
  value: {
    type: String,
    required: [true, "Value is required"],
  },
  customer_fill: {
    type: Boolean,
    required: [true, "Customer fill is required"],
  },
  owner_fill: {
    type: Boolean,
    required: [true, "Owner Fill is required"],
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "SuperAdmin" },
  updatedBy: { type: mongoose.Types.ObjectId, ref: "SuperAdmin" },
  // posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
},
{
  timestamps: true,
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true },
}
);

// Virtual Populate
communityPropertiesSchema.virtual('relatedPosts', {
  ref: 'Post',  // اسم الموديل الذي يشير إليه
  localField: '_id',  // الحقل في هذا الموديل
  foreignField: 'properties',  // الحقل في الموديل الآخر
  justOne: false,
});

const CommunityPropertiesModel = mongoose.models.communityProperties || model("communityProperties", communityPropertiesSchema);

export default CommunityPropertiesModel;

