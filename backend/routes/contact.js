import express from 'express'
import {
  sendMessage,
  getAllContacts
} from '../controllers/contactController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.post('/', sendMessage)
router.get('/', protect, adminOnly, getAllContacts)

export default router
