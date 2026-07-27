import User from '../models/User.js'
import Booking from '../models/Booking.js'
import { sendSuccess, sendError } from '../utils/response.js'

// Get user profile
export const getProfile = async (req, res) => {
  try {
    if (req.userRole === 'admin' && req.userId === 'admin') {
      return sendSuccess(res, {
        user: { id: 'admin', name: 'Admin', email: 'musheerkhan@gmail.com', role: 'admin' }
      }, 'Admin profile fetched successfully')
    }

    const user = await User.findById(req.userId)

    if (!user) {
      return sendError(res, 'User not found', 404)
    }

    sendSuccess(res, { user }, 'Profile fetched successfully')
  } catch (error) {
    console.error('Get profile error:', error)
    sendError(res, error.message, 500)
  }
}

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    if (req.userRole === 'admin' && req.userId === 'admin') {
      return sendError(res, 'Admin profile cannot be updated here', 403)
    }

    const { name, email, phone, address } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email, phone, address, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    sendSuccess(res, { user }, 'Profile updated successfully')
  } catch (error) {
    console.error('Update profile error:', error)
    sendError(res, error.message, 500)
  }
}

// Get user bookings
export const getBookings = async (req, res) => {
  try {
    if (req.userRole === 'admin' && req.userId === 'admin') {
      const bookings = await Booking.find()
        .populate('service')
        .sort({ createdAt: -1 })

      return sendSuccess(res, { bookings }, 'Bookings fetched successfully')
    }

    const bookings = await Booking.find({ user: req.userId })
      .populate('service')
      .sort({ createdAt: -1 })

    sendSuccess(res, { bookings }, 'Bookings fetched successfully')
  } catch (error) {
    console.error('Get bookings error:', error)
    sendError(res, error.message, 500)
  }
}

// Update booking status (admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return sendError(res, 'Access denied. Admin only', 403)
    }

    const { id } = req.params
    const { status } = req.body

    const allowedStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
    if (!allowedStatuses.includes(status)) {
      return sendError(res, 'Invalid booking status', 400)
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('service')

    if (!booking) {
      return sendError(res, 'Booking not found', 404)
    }

    sendSuccess(res, { booking }, 'Booking status updated successfully')
  } catch (error) {
    console.error('Update booking status error:', error)
    sendError(res, error.message, 500)
  }
}
