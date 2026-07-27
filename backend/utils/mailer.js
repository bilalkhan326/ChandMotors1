import nodemailer from 'nodemailer'

// Send admin notification when a new contact message arrives.
// Falls back to console.log when SMTP is not configured.
export const sendAdminNotification = async ({ fullName, email, phone, subject, message }) => {
  try {
    const SMTP_HOST = process.env.SMTP_HOST
    const SMTP_PORT = process.env.SMTP_PORT
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS
    const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || SMTP_USER

    const bodyPlain = `New contact message\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`

    // If SMTP not configured, just log the payload for now
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.log('Mailer not configured - admin notification payload:\n', bodyPlain)
      return
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    })

    const info = await transporter.sendMail({
      from: `${process.env.SITE_NAME || 'Chand Motors'} <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `Website Contact: ${subject || 'New Message'}`,
      text: bodyPlain,
      html: `<pre style="white-space:pre-wrap">${bodyPlain}</pre>`
    })

    console.log('Admin notification sent:', info.messageId)
  } catch (error) {
    console.error('Failed to send admin notification:', error)
  }
}

export const sendBookingNotification = async ({ customerName, customerEmail, customerPhone, serviceName, vehicleModel, preferredDate, notes, servicePrice }) => {
  try {
    const SMTP_HOST = process.env.SMTP_HOST
    const SMTP_PORT = process.env.SMTP_PORT
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS
    const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || SMTP_USER

    const bodyPlain = `New booking request\n\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\nService: ${serviceName}\nVehicle Model: ${vehicleModel}\nPreferred Date: ${preferredDate}\nService Price: ${servicePrice}\n\nNotes:\n${notes || 'N/A'}`

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.log('Mailer not configured - booking notification payload:\n', bodyPlain)
      return
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    })

    const info = await transporter.sendMail({
      from: `${process.env.SITE_NAME || 'Chand Motors G-9'} <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Booking Request: ${serviceName}`,
      text: bodyPlain,
      html: `<pre style="white-space:pre-wrap">${bodyPlain}</pre>`
    })

    console.log('Booking notification sent:', info.messageId)
  } catch (error) {
    console.error('Failed to send booking notification:', error)
  }
}
