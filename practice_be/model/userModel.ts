import { Schema, model } from "mongoose";
import { iUserData } from "../utils/interface";

const userModel = new Schema<iUserData>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    status: {
      type: String,
    },
    schoolCode: {
      type: String,
      unique: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
