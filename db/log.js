
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
    minlength: [8, "Password should be at least 8 characters long"],
    maxlength: [20, "Password should not exceed 20 characters"],
    validate: {
      validator: (value) => {
        // يتحقق من وجود أحرف وأرقام ورموز في كلمة المرور
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(value);
      },
      message: "Password should contain at least one letter, one number, and one special character",
    },
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
