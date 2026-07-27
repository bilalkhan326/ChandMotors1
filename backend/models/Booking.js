import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  externalServiceId: {
    type: String,
    default: ''
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  vehicleModel: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Booking', bookingSchema)
