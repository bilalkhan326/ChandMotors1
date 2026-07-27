import express from 'express'
import {
  getProfile,
  updateProfile,
  getBookings,
  updateBookingStatus
} from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/bookings', protect, getBookings)
router.patch('/bookings/:id/status', protect, adminOnly, updateBookingStatus)

export default router
