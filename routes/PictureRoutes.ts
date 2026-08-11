import express, { Router, Request } from "express";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import {
  addPicture,
  getPictures,
  getPictureById,
  deletePicture,
  updatePicture,
} from "../controllers/PictureController.js";
import { protect } from "../middleware/Auth.js";

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

/**
 * @openapi
 * /api/pictures:
 *   post:
 *     summary: Upload a new picture for a recipe
 *     tags:
 *       - Pictures
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - recipe
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finished Dish Overview
 *               recipe:
 *                 type: string
 *                 description: MongoDB Recipe ObjectId
 *                 example: 60d5ecb8b5c9c22b4c8e4111
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPG, JPEG, PNG, max 3MB)
 *     responses:
 *       201:
 *         description: Picture uploaded and recorded successfully
 *       400:
 *         description: Missing fields, no file uploaded, or invalid image format/size
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Associated recipe not found
 *   get:
 *     summary: Get all pictures
 *     tags:
 *       - Pictures
 *     responses:
 *       200:
 *         description: List of all pictures retrieved successfully
 */
router
  .route("/")
  .post(protect, upload.single("file"), addPicture)
  .get(getPictures);

/**
 * @openapi
 * /api/pictures/{id}:
 *   get:
 *     summary: Get a picture by ID
 *     tags:
 *       - Pictures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Picture ObjectId
 *     responses:
 *       200:
 *         description: Picture details retrieved successfully
 *       404:
 *         description: Picture not found
 *   patch:
 *     summary: Update picture title
 *     tags:
 *       - Pictures
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Picture ObjectId
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Dish View
 *     responses:
 *       200:
 *         description: Picture title updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Picture not found
 *   delete:
 *     summary: Delete a picture record and its physical image file
 *     tags:
 *       - Pictures
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Picture ObjectId
 *     responses:
 *       200:
 *         description: Picture and physical file deleted successfully
 *       401:
 *         description: Not authorized or user does not own the associated recipe
 *       404:
 *         description: Picture or associated recipe not found
 */
router
  .route("/:id")
  .get(getPictureById)
  .delete(protect, deletePicture)
  .patch(protect, updatePicture);

export default router;