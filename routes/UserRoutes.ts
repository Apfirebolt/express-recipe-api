import express, { Router } from "express";
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
} from '../controllers/UserController.ts'
import { protect, admin } from '../middleware/Auth.ts'

const router: Router = express.Router();

router.route('/').post(registerUser).get(getUsers)
router.post('/login', authUser)
router.post('/change-password', protect, updatePassword)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
