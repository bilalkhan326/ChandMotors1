import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email']
  },
  phone: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Please provide a message']
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Contact', contactSchema)
