import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();
import {
  addPicture,
  getPictures,
  getPictureById,
  deletePicture,
  updatePicture
} from "../controllers/PictureController.js";
import { protect } from "../middleware/Auth.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  limits: {
    fieldNameSize: 300,
    fileSize: 3145728, // 3 Mb
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router
  .route("/")
  .post(protect, upload.single("file"), addPicture)
  .get(getPictures);
router.route("/:id")
  .get(getPictureById)
  .delete(protect, deletePicture)
  .patch(protect, updatePicture)

export default router;
