import Service from '../models/Service.js'
import Booking from '../models/Booking.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { sendBookingNotification } from '../utils/mailer.js'

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ available: true })

    sendSuccess(res, { services }, 'Services fetched successfully')
  } catch (error) {
    console.error('Get services error:', error)
    sendError(res, error.message, 500)
  }
}

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return sendError(res, 'Service not found', 404)
    }

    sendSuccess(res, { service }, 'Service fetched successfully')
  } catch (error) {
    console.error('Get service error:', error)
    sendError(res, error.message, 500)
  }
}

// Create service (admin only)
export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, features } = req.body

    const service = new Service({
      name,
      description,
      price,
      duration,
      features: features || []
    })

    await service.save()

    sendSuccess(res, { service }, 'Service created successfully', 201)
  } catch (error) {
    console.error('Create service error:', error)
    sendError(res, error.message, 500)
  }
}

// Book service
export const bookService = async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      servicePrice,
      customerName,
      customerEmail,
      customerPhone,
      vehicleModel,
      preferredDate,
      notes
    } = req.body

    if (!serviceName || !servicePrice || !customerName || !customerEmail || !customerPhone || !vehicleModel || !preferredDate) {
      return sendError(res, 'Please provide all required booking fields', 400)
    }

    const numericServicePrice = Number(servicePrice)
    if (Number.isNaN(numericServicePrice) || numericServicePrice <= 0) {
      return sendError(res, 'Please provide a valid service price', 400)
    }

    const parsedPreferredDate = new Date(preferredDate)
    if (Number.isNaN(parsedPreferredDate.getTime())) {
      return sendError(res, 'Please provide a valid preferred date', 400)
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (parsedPreferredDate < today) {
      return sendError(res, 'Preferred date cannot be in the past', 400)
    }

    // Create booking
    const booking = new Booking({
      user: req.userId || null,
      service: null,
      externalServiceId: serviceId ? String(serviceId) : '',
      serviceName,
      servicePrice: numericServicePrice,
      customerName,
      customerEmail,
      customerPhone,
      vehicleModel,
      preferredDate: parsedPreferredDate,
      notes,
      price: numericServicePrice
    })

    await booking.save()

    try {
      sendBookingNotification({
        customerName,
        customerEmail,
        customerPhone,
        serviceName,
        vehicleModel,
        preferredDate: parsedPreferredDate.toISOString().slice(0, 10),
        notes,
        servicePrice: numericServicePrice
      })
    } catch (notificationError) {
      console.error('Booking notification error:', notificationError)
    }

    sendSuccess(res, { booking }, 'Service booked successfully', 201)
  } catch (error) {
    console.error('Book service error:', error)
    sendError(res, error.message, 500)
  }
}
