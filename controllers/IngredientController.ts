import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Ingredient, { IIngredient } from "../models/Ingredient.ts";
import Recipe, { IRecipe } from "../models/Recipe.ts";

// Request Body Interfaces
interface AddIngredientBody {
  recipe?: string;
  name?: string;
  quantity?: number;
}

interface UpdateIngredientBody {
  name?: string;
  quantity?: number;
}

// @desc    Add a new ingredient
// @route   POST /api/ingredients
// @access  Private
const addIngredient = asyncHandler(
  async (
    req: Request<{}, {}, AddIngredientBody>,
    res: Response
  ): Promise<void> => {
    const { recipe, name, quantity } = req.body;

    if (!recipe || !name) {
      res.status(400);
      throw new Error("Recipe and name fields are required");
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
      throw new Error("User not authorized to add ingredient");
    }

    const ingredient: IIngredient = await Ingredient.create({
      recipe,
      name,
      quantity,
    });

    if (ingredient) {
      res.status(201).json({
        _id: ingredient._id,
        name: ingredient.name,
        quantity: ingredient.quantity,
      });
    } else {
      res.status(400);
      throw new Error("Invalid ingredient data");
    }
  }
);

// @desc    Get all ingredients
// @route   GET /api/ingredients
// @access  Public
const getIngredients = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const ingredients: IIngredient[] = await Ingredient.find({});
    res.json(ingredients);
  }
);

// @desc    Get ingredient by ID
// @route   GET /api/ingredients/:id
// @access  Public
const getIngredientById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const ingredient: IIngredient | null = await Ingredient.findById(
      req.params.id
    );

    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404);
      throw new Error("Ingredient not found");
    }
  }
);

// @desc    Update a single ingredient
// @route   PUT /api/ingredients/:id
// @access  Private
const updateIngredient = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UpdateIngredientBody>,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const ingredient: IIngredient | null = await Ingredient.findById(
      req.params.id
    );

    if (ingredient) {
      const relatedRecipe: IRecipe | null = await Recipe.findById(
        ingredient.recipe
      );

      if (!relatedRecipe) {
        res.status(404);
        throw new Error("Associated recipe not found");
      }

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User not authorized to update ingredient");
      }

      ingredient.name = req.body.name || ingredient.name;
      ingredient.quantity =
        req.body.quantity !== undefined
          ? req.body.quantity
          : ingredient.quantity;

      const updatedIngredient: IIngredient = await ingredient.save();
      res.json({
        message: "Ingredient data updated successfully",
        data: updatedIngredient,
      });
    } else {
      res.status(404);
      throw new Error("Ingredient not found");
    }
  }
);

// @desc    Delete a single ingredient
// @route   DELETE /api/ingredients/:id
// @access  Private
const deleteIngredient = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const ingredient: IIngredient | null = await Ingredient.findById(
      req.params.id
    );

    if (ingredient) {
      const relatedRecipe: IRecipe | null = await Recipe.findById(
        ingredient.recipe
      );

      if (!relatedRecipe) {
        res.status(404);
        throw new Error("Associated recipe not found");
      }

      // Check if recipe owner is the logged in user
      if (relatedRecipe.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("User not authorized to delete ingredient");
      }

      await ingredient.deleteOne();
      res.status(204).send();
    } else {
      res.status(404);
      throw new Error("Ingredient not found");
    }
  }
);

export {
  addIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};