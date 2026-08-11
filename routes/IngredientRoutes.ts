import express, { Router } from "express";
import {
  addIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} from "../controllers/IngredientController.ts";
import { protect } from "../middleware/Auth.ts";

const router: Router = express.Router();

router.route("/").post(protect, addIngredient).get(getIngredients);

router
  .route("/:id")
  .get(getIngredientById)
  .put(protect, updateIngredient)
  .delete(protect, deleteIngredient);

export default router;