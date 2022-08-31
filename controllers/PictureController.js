import asyncHandler from "express-async-handler";
import Picture from "../models/Picture.js";
import Recipe from "../models/Recipe.js";
import fs from "fs";
import Ingredient from "../models/Ingredient.js";

// @desc    Auth user & get token
// @route   POST /api/pictures
// @access  Private

const addPicture = asyncHandler(async (req, res) => {
  const { title, recipe, ingredient } = req.body;

  if ((!recipe && !ingredient) || !title) {
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
        recipe: picture.recipe,
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

// @desc    Update a single picture
// @route   PATCH /api/pictures/id
// @access  Private
const updatePicture = asyncHandler(async (req, res) => {

  const picture = await Picture.findOne({ _id: req.params.id})
  if (picture) {
    picture.title = req.body.title || picture.title

    const updatedPicture = await picture.save()
    res.json({
      message: 'Picture data updated successfully',
      data: updatedPicture
    })
  } else {
    res.status(404)
    throw new Error('Picture not found')
  }
})

// @desc    Delete a single picture
// @route   DELETE /api/pictures/id
// @access  Private
const deletePicture = asyncHandler(async (req, res) => {
  const picture = await Picture.findOne({ _id: req.params.id });
  if (picture) {
    if (picture.recipe) {
      const relatedRecipe = await Recipe.findOne({ _id: picture.recipe });

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User not authorized to delete picture");
      }
    }

    const filename = picture.name;
    fs.unlink("./uploads/" + filename, (err) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          success: false,
        });
      }
    });

    await picture.remove();

    res.json({
      message: "Picture removed",
    });
  } else {
    res.status(404);
    throw new Error("Picture not found");
  }
});

export { addPicture, getPictures, getPictureById, deletePicture, updatePicture };
