import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(`${process.env.DB_URL}`);
const database = mongoose.connection;

export const connectDatabase = () => {
   database.once("open", () =>
      console.log("Conexão com o MongoDB foi feita com sucesso!")
   );
};
