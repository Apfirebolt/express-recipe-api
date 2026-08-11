import express, { Router } from "express";
import {
  addStep,
  getSteps,
  getStepById,
  updateStep,
  deleteStep,
} from "../controllers/StepController.ts";
import { protect } from "../middleware/Auth.ts";

const router: Router = express.Router();

router.route("/").post(protect, addStep).get(getSteps);

router
  .route("/:id")
  .get(getStepById)
  .put(protect, updateStep)
  .delete(protect, deleteStep);

export default router;