import Settings from '../models/Settings.js'
import { sendSuccess, sendError } from '../utils/response.js'

// Get settings (single document)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    sendSuccess(res, { settings }, 'Settings fetched')
  } catch (error) {
    console.error('Get settings error:', error)
    sendError(res, error.message, 500)
  }
}

// Update settings (admin only)
export const updateSettings = async (req, res) => {
  try {
    const { logo, heroImage } = req.body

    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings({ logo, heroImage })
    } else {
      settings.logo = logo ?? settings.logo
      settings.heroImage = heroImage ?? settings.heroImage
      settings.updatedAt = new Date()
    }

    await settings.save()

    sendSuccess(res, { settings }, 'Settings updated')
  } catch (error) {
    console.error('Update settings error:', error)
    sendError(res, error.message, 500)
  }
}
