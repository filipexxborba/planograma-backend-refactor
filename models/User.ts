import mongoose, { model } from "mongoose";
import { IUserDocument } from "../@types/User";

// User Schema
const userSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   login: String,
   password: String,
   isAdmin: Boolean,
   tempHash: String,
   filial_id: Number,
});

export const UserModel = model<IUserDocument>("user", userSchema);
