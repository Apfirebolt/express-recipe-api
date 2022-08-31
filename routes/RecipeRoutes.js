import express from 'express'
const router = express.Router()
import {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from '../controllers/RecipeController.js'
import { protect } from '../middleware/Auth.js'

router.route('/').post(protect, addRecipe).get(getRecipes)
router
  .route('/:id')
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe)

export default router
