import express, { Request, Response } from "express";
import { GondolaModel } from "../models/Gondola";
import { IGondolaDocument } from "../@types/Gondola";
require("dotenv").config();

const router = express.Router();

// Rota que vai excluir a foto da gondola
router.post("/excluir/:id&:index", (req: Request, res: Response) => {
   const { id, index } = req.params;
   GondolaModel.findById(id, (error: Error, gondola: IGondolaDocument) => {
      if (error) {
         res.status(500).send({ message: error.message });
      }
      if (gondola) {
         const newImagesList: string[] = gondola.imagens;
         newImagesList.splice(parseInt(index), 1);
         gondola.imagens = newImagesList;
         gondola
            .save()
            .then((gondola) => {
               res.status(200).send(gondola);
            })
            .catch((error) => res.status(500).send({ message: error.message }));
      }
   });
});

// Rota que vai adicionar a foto na gondola
router.post("/incluir/:id&:nome", (req: Request, res: Response) => {
   const { id, nome } = req.params;
   GondolaModel.findById(id, (error: Error, gondola: IGondolaDocument) => {
      if (error) {
         res.status(500).send({ message: error.message });
      }
      if (gondola) {
         const imageList = gondola.imagens;
         imageList.push(
            `http://panoramavm.no-ip.info:${process.env.PORT}/${nome}.png`
         );
         gondola.imagens = imageList;
         gondola
            .save()
            .then((gondola) => {
               res.status(200).send(gondola);
            })
            .catch((error) => res.status(500).send({ message: error.message }));
      }
   });
});
