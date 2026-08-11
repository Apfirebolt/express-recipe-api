import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Picture, { IPicture } from "../models/Picture.ts";
import Recipe, { IRecipe } from "../models/Recipe.ts";
import fs from "fs/promises";

// Request Body Interfaces
interface AddPictureBody {
  title?: string;
  recipe?: string;
}

interface UpdatePictureBody {
  title?: string;
}

// @desc    Add a new picture (with Multer file upload)
// @route   POST /api/pictures
// @access  Private
const addPicture = asyncHandler(
  async (
    req: Request<{}, {}, AddPictureBody>,
    res: Response
  ): Promise<void> => {
    const { title, recipe } = req.body;

    if (!recipe || !title) {
      res.status(400);
      throw new Error("Title and Recipe are required");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Please upload an image file");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const relatedRecipe: IRecipe | null = await Recipe.findById(recipe);

    if (!relatedRecipe) {
      res.status(404);
      throw new Error("Associated recipe not found");
    }

    // Check if recipe owner is the logged in user
    if (relatedRecipe.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to add picture to this recipe");
    }

    // Add Picture
    const picture: IPicture = await Picture.create({
      title,
      recipe,
      name: req.file.filename,
    });

    if (picture) {
      res.status(201).json({
        _id: picture._id,
        title: picture.title,
        name: picture.name,
        recipe: picture.recipe,
      });
    } else {
      res.status(400);
      throw new Error("Invalid picture data");
    }
  }
);

// @desc    Get all pictures
// @route   GET /api/pictures
// @access  Public
const getPictures = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const pictures: IPicture[] = await Picture.find({});
    res.json(pictures);
  }
);

// @desc    Get picture by ID
// @route   GET /api/pictures/:id
// @access  Public
const getPictureById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const picture: IPicture | null = await Picture.findById(req.params.id);

    if (picture) {
      res.json(picture);
    } else {
      res.status(404);
      throw new Error("Picture not found");
    }
  }
);

// @desc    Update a single picture title
// @route   PATCH /api/pictures/:id
// @access  Private
const updatePicture = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UpdatePictureBody>,
    res: Response
  ): Promise<void> => {
    const picture: IPicture | null = await Picture.findById(req.params.id);

    if (picture) {
      picture.title = req.body.title || picture.title;

      const updatedPicture: IPicture = await picture.save();
      res.json({
        message: "Picture data updated successfully",
        data: updatedPicture,
      });
    } else {
      res.status(404);
      throw new Error("Picture not found");
    }
  }
);

// @desc    Delete a single picture & its physical file
// @route   DELETE /api/pictures/:id
// @access  Private
const deletePicture = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const picture: IPicture | null = await Picture.findById(req.params.id);

    if (!picture) {
      res.status(404);
      throw new Error("Picture not found");
    }

    if (picture.recipe) {
      const relatedRecipe: IRecipe | null = await Recipe.findById(picture.recipe);

      if (!relatedRecipe) {
        res.status(404);
        throw new Error("Associated recipe not found");
      }

      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User not authorized to delete picture");
      }
    }

    // Delete the physical file using await
    try {
      await fs.unlink("./uploads/" + picture.name);
    } catch (err: unknown) {
      console.error("File deletion failed:", err);
    }

    await Picture.deleteOne({ _id: picture._id });

    res.json({
      message: "Picture removed",
    });
  }
);

export {
  addPicture,
  getPictures,
  getPictureById,
  deletePicture,
  updatePicture,
};