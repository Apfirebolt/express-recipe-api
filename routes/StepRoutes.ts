import express, { Router } from "express";
import {
  addStep,
  getSteps,
  getStepById,
  updateStep,
  deleteStep,
} from "../controllers/StepController.js";
import { protect } from "../middleware/Auth.js";

const router: Router = express.Router();

/**
 * @openapi
 * /api/steps:
 *   post:
 *     summary: Add a new step to a recipe
 *     tags:
 *       - Steps
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
 *               - description
 *             properties:
 *               recipe:
 *                 type: string
 *                 description: MongoDB Recipe ObjectId
 *                 example: 60d5ecb8b5c9c22b4c8e4111
 *               description:
 *                 type: string
 *                 example: Pre-heat the oven to 375 degrees F (190 degrees C).
 *     responses:
 *       201:
 *         description: Step created successfully
 *       400:
 *         description: Missing required fields or invalid step data
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Associated recipe not found
 *   get:
 *     summary: Get all steps
 *     tags:
 *       - Steps
 *     responses:
 *       200:
 *         description: List of all steps retrieved successfully
 */
router.route("/").post(protect, addStep).get(getSteps);

/**
 * @openapi
 * /api/steps/{id}:
 *   get:
 *     summary: Get a single step by ID
 *     tags:
 *       - Steps
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Step ObjectId
 *     responses:
 *       200:
 *         description: Step details retrieved successfully
 *       404:
 *         description: Step not found
 *   put:
 *     summary: Update a step description
 *     tags:
 *       - Steps
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Step ObjectId
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Pre-heat the oven to 400 degrees F (200 degrees C).
 *     responses:
 *       200:
 *         description: Step updated successfully
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Step or associated recipe not found
 *   delete:
 *     summary: Delete a step
 *     tags:
 *       - Steps
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Step ObjectId
 *     responses:
 *       204:
 *         description: Step deleted successfully
 *       401:
 *         description: Not authorized or user does not own the recipe
 *       404:
 *         description: Step or associated recipe not found
 */
router
  .route("/:id")
  .get(getStepById)
  .put(protect, updateStep)
  .delete(protect, deleteStep);

export default router;