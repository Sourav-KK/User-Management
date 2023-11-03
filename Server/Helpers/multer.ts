import multer from "multer";
// import { Request, Response } from "express";

//uploads category img
const multerStorageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + `.png`);
  },
});

const uploadSingleFile = multer({ storage: multerStorageCategory }).fields([
  { name: "image", maxCount: 1 },
]);

export default uploadSingleFile;
