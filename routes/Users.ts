import express, { Request, Response } from "express";
import { UserModel } from "../models/User";
import { IUserDocument } from "../@types/User";

// Model and router init
const router = express.Router();

// Rota pra validar todos os usuários cadastrados e suas senhas
router.get("/", (_: Request, res: Response) => {
   UserModel.find((error: Error, user: IUserDocument) => {
      if (error) {
         res.status(500).send({ message: error.message });
      }
      res.status(200).json(user);
   });
});

// Rota que retorna todos os temphash de cada usuário
router.get("/temphash/", (_: Request, res: Response) => {
   UserModel.find((error: Error, users: IUserDocument[]) => {
      if (error) {
         res.status(500).send({ message: error.message });
      }
      const data: any = [];
      users.forEach((user: IUserDocument) => {
         data.push([user.login, user.tempHash]);
      });
      res.json(data).status(200);
   });
});
