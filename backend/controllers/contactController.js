import Contact from '../models/Contact.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { sendAdminNotification } from '../utils/mailer.js'

// Send contact message
export const sendMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body

    // Validate required fields
    if (!fullName || !email || !message) {
      return sendError(res, 'Please provide all required fields', 400)
    }

    // Create contact message
    const contact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message
    })

    await contact.save()

    // TODO: Send email notification to admin
    try {
      // fire-and-forget notification (non-blocking)
      sendAdminNotification({ fullName, email, phone, subject, message })
    } catch (e) {
      console.error('Notification error:', e)
    }

    sendSuccess(res, { contact }, 'Message sent successfully', 201)
  } catch (error) {
    console.error('Contact error:', error)
    sendError(res, error.message, 500)
  }
}

// Get all contacts (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })

    sendSuccess(res, { contacts }, 'Contacts fetched successfully')
  } catch (error) {
    console.error('Get contacts error:', error)
    sendError(res, error.message, 500)
  }
}
