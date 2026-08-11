import express, { Router } from "express";
import {
  addIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} from "../controllers/IngredientController.js";
import { protect } from "../middleware/Auth.js";

const router: Router = express.Router();

/**
 * @openapi
 * /api/ingredients:
 *   post:
 *     summary: Add a new ingredient to a recipe
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe
 *               - name
 *             properties:
 *               recipe:
 *                 type: string
 *                 description: MongoDB Recipe ObjectId
 *                 example: 60d5ecb8b5c9c22b4c8e4111
 *               name:
 *                 type: string
 *                 example: Olive Oil
 *               quantity:
 *                 type: number
 *                 example: 2
 *                 description: Quantity or measure of the ingredient
 *     responses:
 *       201:
 *         description: Ingredient added successfully
 *       400:
 *         description: Missing required fields or invalid ingredient data
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Associated recipe not found
 *   get:
 *     summary: Get all ingredients
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: List of all ingredients retrieved successfully
 */
router.route("/").post(protect, addIngredient).get(getIngredients);

/**
 * @openapi
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get a single ingredient by ID
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Ingredient ObjectId
 *     responses:
 *       200:
 *         description: Ingredient details retrieved successfully
 *       404:
 *         description: Ingredient not found
 *   put:
 *     summary: Update an ingredient
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Ingredient ObjectId
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Extra Virgin Olive Oil
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Ingredient or associated recipe not found
 *   delete:
 *     summary: Delete an ingredient
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Ingredient ObjectId
 *     responses:
 *       204:
 *         description: Ingredient deleted successfully
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Ingredient or associated recipe not found
 */
router
  .route("/:id")
  .get(getIngredientById)
  .put(protect, updateIngredient)
  .delete(protect, deleteIngredient);

export default router;