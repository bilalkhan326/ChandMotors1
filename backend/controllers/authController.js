import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'
import { sendSuccess, sendError } from '../utils/response.js'

// Register user
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return sendError(res, 'Email already registered', 400)
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Return user data without password
    const userResponse = user.toObject()
    delete userResponse.password

    sendSuccess(res, {
      user: userResponse,
      token
    }, 'Signup successful', 201)
  } catch (error) {
    console.error('Signup error:', error)
    sendError(res, error.message || 'Signup failed', 500)
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400)
    }

    // Allow hardcoded admin login (server-side)
    const ADMIN_EMAIL = 'musheerkhan@gmail.com'
    const ADMIN_PASS = 'India326$'

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const adminUser = { id: 'admin', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' }
      const token = generateToken({ id: 'admin', role: 'admin' })
      return sendSuccess(res, { user: adminUser, token }, 'Login successful')
    }

    // Find user and select password
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return sendError(res, 'Invalid credentials', 401)
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password)
    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials', 401)
    }

    // Generate token
    const token = generateToken({ id: user._id, role: user.role })

    // Return user data without password
    const userResponse = user.toObject()
    delete userResponse.password

    sendSuccess(res, {
      user: userResponse,
      token
    }, 'Login successful')
  } catch (error) {
    console.error('Login error:', error)
    sendError(res, error.message || 'Login failed', 500)
  }
}

// Logout
export const logout = async (req, res) => {
  try {
    sendSuccess(res, {}, 'Logout successful')
  } catch (error) {
    sendError(res, error.message, 500)
  }
}
