import asyncHandler from "express-async-handler";
import Recipe from "../models/Recipe.js";
import Step from "../models/Step.js";
import Ingredient from "../models/Ingredient.js";
import Picture from "../models/Picture.js";
import { sendJson } from "../utils/kafkaConnect.js";

// @desc    Auth user & get token
// @route   POST /api/recipes
// @access  Private

const addRecipe = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const recipeExists = await Recipe.findOne({ title, user: req.user._id });

  if (recipeExists) {
    res.status(400);
    throw new Error("Recipe already exists");
  }

  if (!title) {
    res.status(400);
    throw new Error("Please add a recipe title");
  }

  const recipe = await Recipe.create({
    title,
    user: req.user._id,
  });

  if (recipe) {
    // Send message to Kafka topic
    await sendJson("recipes", String(recipe._id), {
      recipeId: recipe._id,
      userId: req.user._id,
      title: recipe.title,
    });
    res.status(201).json({
      _id: recipe._id,
      title: recipe.title,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
});

// @desc    Get all recipes (with pagination)
// @route   GET /api/recipes?page=1
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 50;
  const page = Number(req.query.page) || 1;

  // Get total count of documents for pagination metadata
  const total = await Recipe.countDocuments({});

  // Fetch paginated recipes sorted by newest first
  const recipes = await Recipe.find({}).populate("user", "username email")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    recipes,
    page,
    pages: Math.ceil(total / pageSize),
    total,
  });
});

// @desc    Get my recipes
// @route   GET /api/my-recipes
// @access  Private

const getMyRecipes = asyncHandler(async (req, res) => {
  const pageSize = 50;
  const page = Number(req.query.page) || 1;

  // Get total count of documents for pagination metadata
  const total = await Recipe.countDocuments({ user: req.user._id });

  // Fetch paginated recipes sorted by newest first
  const recipes = await Recipe.find({ user: req.user._id })
    .populate("user", "username email")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    recipes,
    page,
    pages: Math.ceil(total / pageSize),
    total,
  });
});

// @desc    Get user by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate("user", "username email");

  if (recipe) {
    const ingredients = await Ingredient.find({ recipe: recipe._id });
    const steps = await Step.find({ recipe: recipe._id });
    const pictures = await Picture.find({ recipe: recipe._id });
    const data = {
      createdBy: recipe.user,
      _id: recipe._id,
      title: recipe.title,
      ingredients,
      steps,
      pictures,
    };
    res.json(data);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc    Update a single recipe
// @route   PUT /api/recipes/id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({
    user: req.user._id,
    _id: req.params.id,
  });
  if (recipe) {
    recipe.title = req.body.title || recipe.title;

    const updatedRecipe = await recipe.save();
    res.json({
      message: "Recipe data updated successfully",
      data: updatedRecipe,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc    Delete a single recipe
// @route   DELETE /api/recipes/id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({
    user: req.user._id,
    _id: req.params.id,
  });
  if (recipe) {
    await recipe.deleteOne();

    res.status(204).send();
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

export { addRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe, getMyRecipes };
