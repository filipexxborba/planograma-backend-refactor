import multer from "multer";

const Storage = multer.diskStorage({
   destination: "uploads",
   filename: (req, _, callback) => {
      // const extensaoArquivo = file.originalname.split(".")[1];
      callback(null, `${req.body.name}.png`);
   },
});

export const Upload = multer({
   storage: Storage,
}).single("testImage");
