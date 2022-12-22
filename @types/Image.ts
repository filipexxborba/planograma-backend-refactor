import { Document, Model } from "mongoose";

export interface IImage {
   name: {
      type: String;
      required: true;
   };
   image: {
      data: Buffer;
      contentType: String;
   };
}

export interface IImageDocument extends IImage, Document {}
export interface IImageModel extends Model<IImageDocument> {}
