import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-me'

// Accept either an id string or a payload object
export const generateToken = (payload) => {
  const data = typeof payload === 'string' ? { id: payload } : payload || {}
  return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
