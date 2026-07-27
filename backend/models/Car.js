import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a car name'],
    trim: true
  },
  model: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Electric', 'Sports', 'Van', 'Truck', 'Coupe'],
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  engineCC: {
    type: String,
    default: '2.0L'
  },
  capacity: {
    type: String,
    default: '5 Seats'
  },
  image: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  features: [{
    type: String
  }],
  specifications: {
    engine: String,
    transmission: String,
    fuelType: String,
    mpg: String,
    acceleration: String,
    topSpeed: String,
    seating: String,
    trunkSpace: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
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

export default mongoose.model('Car', carSchema)
