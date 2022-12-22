import { Document, Model } from "mongoose";

export interface IUser {
   login: string;
   password: string;
   isAdmin: boolean;
   tempHash: string;
   filial_id: number;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
