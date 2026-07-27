import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import logger from './utils/logger.js'

// Initialize express app
const app = express()

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.CORS_ORIGIN
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Serve static files from uploads directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from the backend folder's .env
dotenv.config({ path: path.join(__dirname, '.env') })

// Serve uploaded files from backend/uploads so uploaded images are reachable
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB Connection helper
const connectDatabase = async () => {
  const atlasUri = process.env.MONGODB_URI
  const localUri = process.env.FALLBACK_MONGODB_URI || 'mongodb://127.0.0.1:27017/chand-motors'

  if (atlasUri) {
    try {
      await mongoose.connect(atlasUri, { dbName: 'CMotors' })
      logger.info('✓ MongoDB Atlas connected')
      return
    } catch (atlasError) {
      logger.warn('Atlas connection failed, attempting local fallback', {
        error: atlasError.message,
        atlasUri: 'configured'
      })

      try {
        await mongoose.connect(localUri)
        logger.info('✓ Local MongoDB connected', { uri: localUri })
        return
      } catch (localError) {
        logger.error('✗ MongoDB connection error', {
          atlasError: atlasError.message,
          localError: localError.message
        })
        process.exit(1)
      }
    }
  }

  logger.warn('MONGODB_URI not configured, using local MongoDB fallback', {
    uri: localUri
  })

  try {
    await mongoose.connect(localUri)
    logger.info('✓ Local MongoDB connected', { uri: localUri })
  } catch (localError) {
    logger.error('✗ Local MongoDB connection error', {
      localError: localError.message
    })
    process.exit(1)
  }
}

// Routes
import authRoutes from './routes/auth.js'
import carRoutes from './routes/cars.js'
import serviceRoutes from './routes/services.js'
import userRoutes from './routes/users.js'
import contactRoutes from './routes/contact.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/upload.js'

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chand Motors API is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})

// Start server after DB connection
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDatabase()

  app.listen(PORT, () => {
    logger.info('Server started', {
      url: `http://localhost:${PORT}`,
      apiBase: `http://localhost:${PORT}/api`,
      nodeEnv: process.env.NODE_ENV || 'development',
      jwtSecret: process.env.JWT_SECRET ? '***' : 'NOT SET'
    })
  })
}

startServer()

export default app
