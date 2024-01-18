import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      min: 2,
      max: 50,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          // Update the regular expression based on your requirements
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please enter a valid email address',
      },
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      min: 2,
      max: 50,
    },

    bio: {
      type: String,
    },
    admin_email: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    address: {
      type: String,
    },
    sendCode: {
      type: String,
      default: null,
    },
    image: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;