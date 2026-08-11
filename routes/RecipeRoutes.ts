import express, { Router } from "express";
import {
  addRecipe,
  getRecipes,
  getMyRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/RecipeController.js";
import { protect } from "../middleware/Auth.js";

const router: Router = express.Router();

/**
 * @openapi
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Spaghetti Carbonara
 *     responses:
 *       201:
 *         description: Recipe created successfully (Triggers Kafka event)
 *       400:
 *         description: Missing title or recipe already exists for this user
 *       401:
 *         description: Not authorized
 *   get:
 *     summary: Get all recipes (Paginated)
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (50 items per page)
 *     responses:
 *       200:
 *         description: Paginated list of recipes with user information
 */
router.route("/").post(protect, addRecipe).get(getRecipes);

/**
 * @openapi
 * /api/recipes/my-recipes:
 *   get:
 *     summary: Get all recipes created by the logged-in user (Paginated)
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of recipes belonging to the current user
 *       401:
 *         description: Not authorized
 */
router.route("/my-recipes").get(protect, getMyRecipes);

/**
 * @openapi
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe details by ID (includes creator, ingredients, steps, and pictures)
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Recipe ObjectId
 *     responses:
 *       200:
 *         description: Recipe details retrieved successfully
 *       404:
 *         description: Recipe not found
 *   put:
 *     summary: Update a recipe title
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Recipe ObjectId
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Authentic Italian Carbonara
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 *   delete:
 *     summary: Delete a recipe
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Recipe ObjectId
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Recipe not found
 */
router
  .route("/:id")
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

export default router;