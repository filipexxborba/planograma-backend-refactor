import mongoose, { model } from "mongoose";
import { IImageDocument } from "../@types/Image";

// Image Schema
const imageSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: {
      type: String,
      required: true,
   },
   image: {
      data: Buffer,
      contentType: String,
   },
});

export const ImageModel = model<IImageDocument>("image", imageSchema);
