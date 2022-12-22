import express, { Request, Response } from "express";
import { UserModel } from "../models/User";
import { IUserDocument } from "../@types/User";
const router = express.Router();

// Rota que vai receber os dados do usuário e vai retornar o status, se estiver correto vai gerar um novo hash
router.put("/:login&:senha", (req: Request, res: Response) => {
   const { login, senha } = req.params;
   UserModel.find({ login: login }, (error: Error, user: IUserDocument[]) => {
      if (error) {
         // Erro na conexão
         res.status(404).send({ message: error.message });
      }
      if (user) {
         // Usuário não encontrado
         if (user[0] === null || user[0] === undefined) {
            res.status(404).send({
               isValid: false,
               status: `Não foi encontrado nenhum usuário com o login: ${req.params.login}.`,
               code: 1,
            });
         } else {
            //   Usuário encontrado
            const userPassword = user[0].password;
            if (senha === userPassword) {
               // Senha correta
               const newHash = `${Math.random()}sucessfull${Math.random()}`;
               user[0].tempHash = newHash;
               user[0]
                  .save()
                  .then((newUser) => res.status(200).send({ newUser }))
                  .catch((error: Error) =>
                     res.status(500).send({ message: error.message })
                  );
            } else {
               //   Senha não é a correta
               res.status(404).send({
                  isValid: false,
                  status: `Senha incorreta.`,
                  code: 2,
               });
            }
         }
      }
   });
});

export default router;
