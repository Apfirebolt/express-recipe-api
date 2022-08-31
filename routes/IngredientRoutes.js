import express from 'express'
const router = express.Router()
import {
  addIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient
} from '../controllers/IngredientController.js'
import { protect } from '../middleware/Auth.js'

router.route('/').post(protect, addIngredient).get(getIngredients)
router
  .route('/:id')
  .get(getIngredientById)
  .put(protect, updateIngredient)
  .delete(protect, deleteIngredient)

export default router
