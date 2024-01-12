import mongoose, { Schema, model } from "mongoose";

const logSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const logModel = mongoose.models.Log || model("Log", logSchema);
export default logModel;
