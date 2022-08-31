import asyncHandler from "express-async-handler";
import Picture from "../models/Picture.js";
import Recipe from "../models/Recipe.js";
import Step from "../models/Step.js";
import Ingredient from "../models/Ingredient.js";

// @desc    Auth user & get token
// @route   POST /api/pictures
// @access  Private

const addPicture = asyncHandler(async (req, res) => {
  const { title, recipe, ingredient } = req.body;

  if (!recipe && !ingredient || !title) {
    res.status(400);
    throw new Error("Title and Recipe or Ingredient is required");
  }

  // Picture can either belong to recipe or ingredient, check for recipe first
  if (recipe) {
    const relatedRecipe = await Recipe.findOne({ _id: recipe });

    // Check if recipe owner is the logged in user
    if (relatedRecipe.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to add picture to this recipe");
    }

    // Add Picture
    const picture = await Picture.create({
      title,
      recipe,
      name: req.file.filename,
    });

    if (picture) {
      res.status(201).json({
        _id: picture._id,
        title: picture.title,
        name: picture.name,
        recipe: picture.recipe
      });
    } else {
      res.status(400);
      throw new Error("Invalid picture data");
    }
  }
});

// @desc    Get all pictures
// @route   GET /api/pictures
// @access  Public
const getPictures = asyncHandler(async (req, res) => {
  const pictures = await Picture.find({});
  res.json(pictures);
});

// @desc    Get user by ID
// @route   GET /api/pictures/:id
// @access  Public
const getPictureById = asyncHandler(async (req, res) => {
  const picture = await Picture.findById(req.params.id);

  if (picture) {
    res.json(picture);
  } else {
    res.status(404);
    throw new Error("Picture not found");
  }
});

export {
  addPicture,
  getPictures,
  getPictureById,
};
