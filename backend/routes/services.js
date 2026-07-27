import express from 'express'
import {
  getAllServices,
  getServiceById,
  createService,
  bookService
} from '../controllers/serviceController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllServices)
router.get('/:id', getServiceById)
router.post('/', protect, adminOnly, createService)
router.post('/book', bookService)

export default router
