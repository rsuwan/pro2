import mongoose, { Schema, model } from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      require: true,
    },
    first_name: {
      type: mongoose.SchemaTypes.String,
      require: true,
    },
    last_name: {
      type: mongoose.SchemaTypes.String,
      require: true,
    },
    phone: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },
    pio: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },
    created_by: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },

    disabled_by: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },
    address: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },
    community_id: {
      type: mongoose.SchemaTypes.String,
      require: true,
    },
    birth_date: {
      type: Date,
    },

    profile_cover: {
      type: mongoose.SchemaTypes.String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);
const adminModel = mongoose.models.Admin || model("Admin", adminSchema);
export default adminModel;
