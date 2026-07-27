import Car from '../models/Car.js'
import { sendSuccess, sendError } from '../utils/response.js'

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const { limit = 10, skip = 0, type, search } = req.query

    let filter = { inStock: true }

    // Filter by type
    if (type) {
      filter.type = type
    }

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    const cars = await Car.find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ featured: -1, createdAt: -1 })

    const total = await Car.countDocuments(filter)

    sendSuccess(res, {
      cars,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    }, 'Cars fetched successfully')
  } catch (error) {
    console.error('Get cars error:', error)
    sendError(res, error.message, 500)
  }
}

// Get car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return sendError(res, 'Car not found', 404)
    }

    sendSuccess(res, { car }, 'Car fetched successfully')
  } catch (error) {
    console.error('Get car error:', error)
    sendError(res, error.message, 500)
  }
}

// Create car (admin only)
export const createCar = async (req, res) => {
  try {
    const { name, model, type, price, engineCC, capacity, description, features, image, inStock } = req.body

    if (!name || !type || !price) {
      return sendError(res, 'Missing required fields: name, type, price', 400)
    }

    const car = new Car({
      name,
      model: model || '',
      type,
      price,
      engineCC: engineCC || '2.0L',
      capacity: capacity || '5 Seats',
      description: description || '',
      image: image || '',
      features: features || [],
      inStock: inStock !== undefined ? inStock : true
    })

    await car.save()

    sendSuccess(res, { car }, 'Car created successfully', 201)
  } catch (error) {
    console.error('Create car error:', error)
    sendError(res, error.message, 500)
  }
}

// Update car (admin only)
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )

    if (!car) {
      return sendError(res, 'Car not found', 404)
    }

    sendSuccess(res, { car }, 'Car updated successfully')
  } catch (error) {
    console.error('Update car error:', error)
    sendError(res, error.message, 500)
  }
}

// Delete car (admin only)
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)

    if (!car) {
      return sendError(res, 'Car not found', 404)
    }

    sendSuccess(res, { car }, 'Car deleted successfully')
  } catch (error) {
    console.error('Delete car error:', error)
    sendError(res, error.message, 500)
  }
}

// Search cars
export const searchCars = async (req, res) => {
  try {
    const { q, minPrice, maxPrice, type } = req.query

    let filter = { inStock: true }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = parseInt(minPrice)
      if (maxPrice) filter.price.$lte = parseInt(maxPrice)
    }

    if (type) {
      filter.type = type
    }

    const cars = await Car.find(filter).sort({ price: 1 })

    sendSuccess(res, { cars }, 'Search results')
  } catch (error) {
    console.error('Search error:', error)
    sendError(res, error.message, 500)
  }
}
