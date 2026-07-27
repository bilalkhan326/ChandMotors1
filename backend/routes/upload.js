import express from 'express'
import { uploadImage } from '../middleware/upload.js'
import { uploadCarImage, uploadLogoImage, uploadHeroImage } from '../controllers/uploadController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// All upload endpoints require authentication
router.post('/car', protect, uploadImage.single('image'), uploadCarImage)
router.post('/logo', protect, uploadImage.single('image'), uploadLogoImage)
router.post('/hero', protect, uploadImage.single('image'), uploadHeroImage)

export default router
