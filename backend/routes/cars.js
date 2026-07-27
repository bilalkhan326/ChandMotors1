import express from 'express'
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  searchCars
} from '../controllers/carController.js'
import { validateCar } from '../middleware/validation.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllCars)
router.get('/search', searchCars)
router.get('/:id', getCarById)
router.post('/', protect, adminOnly, validateCar, createCar)
router.put('/:id', protect, adminOnly, validateCar, updateCar)
router.delete('/:id', protect, adminOnly, deleteCar)

export default router
