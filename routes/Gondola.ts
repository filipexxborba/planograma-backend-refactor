import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { GondolaModel } from "../models/Gondola";
import { IGondolaDocument } from "../@types/Gondola";
import { Upload } from "../services/multer";
import { ImageModel } from "../models/Image";
const router = express.Router();

// Rota que retorna todas as gondolas
router.get("/", (_: Request, res: Response) => {
   GondolaModel.find((error: Error, gondola: IGondolaDocument) => {
      if (error) {
         res.status(400).send({ message: error.message });
      }
      res.status(200).json(gondola);
   });
});

// Rota que retorna a gondola pelo ID
router.get("/:id", (req: Request, res: Response) => {
   GondolaModel.findById(
      req.params.id,
      (error: Error, gondola: IGondolaDocument) => {
         if (error) {
            res.status(404).send({ message: error.message });
         }
         if (gondola) {
            res.status(200).send(gondola);
         }
      }
   );
});

// Rota que retornas as gondolas por filial
router.get("/filial/:filial_id", (req: Request, res: Response) => {
   GondolaModel.find(
      { filial_id: req.params.filial_id },
      (error: Error, gondola: IGondolaDocument) => {
         if (error) {
            res.status(404).send({ message: error.message });
         }
         if (gondola) {
            res.status(200).send(gondola);
         }
      }
   );
});

// Rota que cadastra uma nova gondola
router.post(
   "/cadastrar/:filial_id&:nome&:linha",
   (req: Request, res: Response) => {
      const id = new mongoose.Types.ObjectId();
      const data = {
         _id: id,
         filial_id: req.params.filial_id,
         nome: req.params.nome,
         nomeExibicao: req.params.nome,
         linha: req.params.linha,
         link: `http://panoramavm.no-ip.info:9991/gondola/${id}`,
         image_url: ``,
         imagens: [],
      };
      const newGondola = new GondolaModel(data);
      newGondola
         .save()
         .then((gondola) => {
            res.send(gondola).status(200);
         })
         .catch((error: Error) =>
            res.status(500).send({ message: error.message })
         );
   }
);

// Rota que altera os dados da gondola
router.put(
   "/update/:id&:nome&:linha",
   (req: Request, res: Response) => {
      const { id, nome, linha } = req.params;
      GondolaModel.findById(id, (error: Error, gondola: IGondolaDocument) => {
         if (error) {
            res.status(404).send({ message: error.message });
         }
         if (gondola) {
            gondola.nomeExibicao = nome;
            gondola.linha = linha;
            gondola
               .save()
               .then((gondola) => {
                  res.status(200).send(gondola);
               })
               .catch((error: Error) =>
                  res.status(500).send({ message: error.message })
               );
         }
      });
   }
);

// Rota que faz o upload da imagem com o Multer
router.post("/upload/", (req: Request, res: Response) => {
   const id = new mongoose.Types.ObjectId();
   Upload(req, res, (error) => {
      if (error) {
         console.log(error);
      } else {
         const newImage = new ImageModel({
            _id: id,
            name: req.body.name,
            image: {
               data: req.body.id,
               contentType: "image/*",
            },
         });
         newImage
            .save()
            .then(() => res.send("Upload feito com sucesso!"))
            .catch((error: Error) => console.log({ message: error.message }));
      }
   });
});

export default router;
