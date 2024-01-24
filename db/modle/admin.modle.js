
import mongoose, { Schema, model } from "mongoose";

const adminSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name should be at least 2 characters"],
    maxlength: [50, "First name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "First name should contain only letters"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name should be at least 2 characters"],
    maxlength: [50, "Last name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "Last name should contain only letters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => {
        // يتحقق من أن البريد الإلكتروني صالح
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  phone: {
    type: String,
    trim: true,
  },
  pio: {
    type: String,
    trim: true,
  },
  created_by: {
    type: String,
    trim: true,
  },
  disabled_by: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  community_id: {
    type: String,
    required: [true, "Community ID is required"],
  },
  birth_date: {
    type: Date,
  },
  created_date: {
    type: Date,
    required: [true, "Created date is required"],
    default: Date.now,
  },
  image: {
    type: Object,
  },
});

const adminModel = mongoose.models.Admin || model("Admin", adminSchema);
export default adminModel;
