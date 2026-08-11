import express, { Router, Request } from "express";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import {
  addPicture,
  getPictures,
  getPictureById,
  deletePicture,
  updatePicture,
} from "../controllers/PictureController.ts";
import { protect } from "../middleware/Auth.ts";

const router: Router = express.Router();

// Multer Storage Configuration
const storage: StorageEngine = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File Type Filter Validation
function checkFileType(
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
}

// Multer Upload Instance
const upload = multer({
  storage,
  limits: {
    fieldNameSize: 300,
    fileSize: 3145728, // 3 MB
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    checkFileType(file, cb);
  },
});

router
  .route("/")
  .post(protect, upload.single("file"), addPicture)
  .get(getPictures);

router
  .route("/:id")
  .get(getPictureById)
  .delete(protect, deletePicture)
  .patch(protect, updatePicture);

export default router;