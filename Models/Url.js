import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCodeUrl: { type: String },
  longCodeUrl: { type: String },
});

export const Url = mongoose.model("url", urlSchema);
