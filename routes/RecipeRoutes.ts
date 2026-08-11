import express, { Router } from "express";
import {
  addRecipe,
  getRecipes,
  getMyRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/RecipeController.ts";
import { protect } from "../middleware/Auth.ts";

const router: Router = express.Router();

router.route("/").post(protect, addRecipe).get(getRecipes);
router.route("/my-recipes").get(protect, getMyRecipes);

router
  .route("/:id")
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

export default router;