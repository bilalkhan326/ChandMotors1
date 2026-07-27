import jwt from 'jsonwebtoken'

// Accept either an id string or a payload object
export const generateToken = (payload) => {
  const data = typeof payload === 'string' ? { id: payload } : payload || {}
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}
