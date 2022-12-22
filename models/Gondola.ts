import mongoose, { model } from "mongoose";
import { IGondolaDocument } from "../@types/Gondola";

// Gondola Schema
const gondolaSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   filial_id: Number,
   link: String,
   image_url: String,
   imagens: Array,
   nome: String,
   nomeExibicao: String,
   linha: String,
});

export const GondolaModel = model<IGondolaDocument>("gondola", gondolaSchema);
