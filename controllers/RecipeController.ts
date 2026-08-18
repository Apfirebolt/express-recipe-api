import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Recipe, { IRecipe } from "../models/Recipe.ts";
import Step, { IStep } from "../models/Step.ts";
import Ingredient, { IIngredient } from "../models/Ingredient.ts";
import Picture, { IPicture } from "../models/Picture.ts";
import { sendJson } from "../utils/kafkaConnect.ts";
import { sendWelcomeEmail } from "../utils/mailService.ts";

// Request Body Interfaces
interface AddRecipeBody {
  title?: string;
}

interface UpdateRecipeBody {
  title?: string;
}

// Request Query Interface for Pagination
interface PaginationQuery {
  page?: string;
}

// Kafka Event Payload Interface
interface RecipeKafkaPayload {
  recipeId: unknown;
  userId: unknown;
  title: string;
}

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const addRecipe = asyncHandler(
  async (req: Request<{}, {}, AddRecipeBody>, res: Response): Promise<void> => {
    const { title } = req.body;

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    if (!title) {
      res.status(400);
      throw new Error("Please add a recipe title");
    }

    const recipeExists = await Recipe.findOne({ title, user: req.user._id });

    if (recipeExists) {
      res.status(400);
      throw new Error("Recipe already exists");
    }

    const recipe: IRecipe = await Recipe.create({
      title,
      user: req.user._id,
    });

    if (recipe) {
      // Send message to Kafka topic
      await sendJson<RecipeKafkaPayload>("recipes", String(recipe._id), {
        recipeId: recipe._id,
        userId: req.user._id,
        title: recipe.title,
      });

      // Send email notification to the user (if email is available)
      try {
        await sendWelcomeEmail({
          to: "ag20contract@gmail.com",
          name: req.user.username || "Sample User",
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }

      res.status(201).json({
        _id: recipe._id,
        title: recipe.title,
      });
    } else {
      res.status(400);
      throw new Error("Invalid recipe data");
    }
  },
);

// @desc    Get all recipes (with pagination)
// @route   GET /api/recipes?page=1
// @access  Public
const getRecipes = asyncHandler(
  async (
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response,
  ): Promise<void> => {
    const pageSize = 50;
    const page = Number(req.query.page) || 1;

    // Get total count of documents for pagination metadata
    const total = await Recipe.countDocuments({});

    // Fetch paginated recipes sorted by newest first
    const recipes: IRecipe[] = await Recipe.find({})
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
  },
);

// @desc    Get my recipes
// @route   GET /api/my-recipes
// @access  Private
const getMyRecipes = asyncHandler(
  async (
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response,
  ): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const pageSize = 50;
    const page = Number(req.query.page) || 1;

    // Get total count of documents for pagination metadata
    const total = await Recipe.countDocuments({ user: req.user._id });

    // Fetch paginated recipes sorted by newest first
    const recipes: IRecipe[] = await Recipe.find({ user: req.user._id })
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
  },
);

// @desc    Get recipe by ID with ingredients, steps, and pictures
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const recipe: IRecipe | null = await Recipe.findById(
      req.params.id,
    ).populate("user", "username email");

    if (recipe) {
      const ingredients: IIngredient[] = await Ingredient.find({
        recipe: recipe._id,
      });
      const steps: IStep[] = await Step.find({ recipe: recipe._id });
      const pictures: IPicture[] = await Picture.find({ recipe: recipe._id });

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
  },
);

// @desc    Update a single recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UpdateRecipeBody>,
    res: Response,
  ): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const recipe: IRecipe | null = await Recipe.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (recipe) {
      recipe.title = req.body.title || recipe.title;

      const updatedRecipe: IRecipe = await recipe.save();
      res.json({
        message: "Recipe data updated successfully",
        data: updatedRecipe,
      });
    } else {
      res.status(404);
      throw new Error("Recipe not found");
    }
  },
);

// @desc    Delete a single recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, no user attached");
    }

    const recipe: IRecipe | null = await Recipe.findOne({
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
  },
);

export {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
};
