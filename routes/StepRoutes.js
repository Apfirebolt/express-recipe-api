import express from 'express'
const router = express.Router()
import {
  addStep,
  getSteps,
  getStepById,
  updateStep,
  deleteStep
} from '../controllers/StepController.js'
import { protect } from '../middleware/Auth.js'

router.route('/').post(protect, addStep).get(getSteps)
router
  .route('/:id')
  .get(getStepById)
  .put(protect, updateStep)
  .delete(protect, deleteStep)

export default router
