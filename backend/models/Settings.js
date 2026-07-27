import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  logo: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Settings', settingsSchema)
