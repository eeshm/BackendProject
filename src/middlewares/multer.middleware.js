import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //cb refers to callback
    cb(null, file.originalname); //TODO: add uniquesuffix to filename
  },
});

export const upload = multer({ 
  storage,
});
