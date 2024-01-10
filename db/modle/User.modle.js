import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },
    state_us: {
      type: String,
      default: "Active",
      enum: ["Active", "InActive"],
    },
    admin_email: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    created_date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    address: {
      type: String,
    },
    profile_cover: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
