import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  duration: {
    type: String,
    default: '1-2 hours'
  },
  features: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Service', serviceSchema)
