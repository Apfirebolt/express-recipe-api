import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updatePassword,
<<<<<<< Updated upstream:routes/UserRoutes.js
} from '../controllers/UserController.js'
import { protect, admin } from '../middleware/Auth.js'
=======
} from "../controllers/UserController.js";
import { protect, admin } from "../middleware/Auth.js";

const router: Router = express.Router();
>>>>>>> Stashed changes:routes/UserRoutes.ts

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists, missing fields, or invalid email format
 *   get:
 *     summary: Get all users (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Not authorized or not an admin
 */
router.route("/").post(registerUser).get(getUsers);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Authenticate user & get JWT token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful, returns user data and JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", authUser);

/**
 * @openapi
 * /api/users/change-password:
 *   post:
 *     summary: Change current user password
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newPassword456
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Current password is incorrect
 *       401:
 *         description: Not authorized
 */
router.post("/change-password", protect, updatePassword);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details retrieved successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update logged-in user profile
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe_updated
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john_new@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newsecret123
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user details by ID (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ObjectId
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Not authorized or not an admin
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user by ID (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ObjectId
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Not authorized or not an admin
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ObjectId
 *     responses:
 *       200:
 *         description: User removed successfully
 *       401:
 *         description: Not authorized or not an admin
 *       404:
 *         description: User not found
 */
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;