import { Document, Model } from "mongoose";

export interface IGondola {
   filial_id: string;
   link: string;
   image_url: string;
   imagens: Array<string>;
   nome: string;
   nomeExibicao: string;
   linha: string;
}

export interface IGondolaDocument extends IGondola, Document {}

export interface IGondolaModel extends Model<IGondolaDocument> {}
