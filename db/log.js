
import mongoose, { Schema, model } from "mongoose";

const logSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  role: {
    type: String,
    default: "User",
    enum: ["SuperAdmin", "SubAdmin", "User"],
  },
  state_us: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
    max: 20,
  },
  sendCode: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const logModel = mongoose.models.Log || model("Log", logSchema);
export default logModel;
