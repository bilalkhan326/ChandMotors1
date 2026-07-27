import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import { contactAPI } from '../services/api'
import { toast } from 'react-toastify'
import SEO from '../components/SEO'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      // Call the backend API to save the message
      await contactAPI.sendMessage(formData)
      toast.success('✅ Message sent successfully! We will contact you soon.')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Contact error:', error)
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title="Contact Us"
        description="Contact Chand Motors G-9 for vehicle inquiries, showroom details, service bookings, and support."
        keywords={['Chand Motors G-9', 'contact', 'Islamabad car dealership', 'vehicle inquiry']}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title mb-4">Get In Touch</h1>
          <p className="section-subtitle">
            Have questions? We'd love to hear from you. Reach out to our team today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-lg p-5 sm:p-6 card-hover text-center"
          >
            <FaPhone className="text-4xl text-[#c41e3a] mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">PHONE</h3>
            <a href="tel:+923005599479" className="text-gray-300 hover:text-[#ff3a52] transition font-semibold text-lg">
              03005599479
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-effect rounded-lg p-5 sm:p-6 card-hover text-center"
          >
            <FaEnvelope className="text-4xl text-[#c41e3a] mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">EMAIL</h3>
            <a href="mailto:info@chandmotors.pk" className="text-gray-300 hover:text-[#ff3a52] transition font-semibold text-lg">
              info@chandmotors.pk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-effect rounded-lg p-5 sm:p-6 card-hover text-center"
          >
            <FaMapMarkerAlt className="text-4xl text-[#c41e3a] mx-auto mb-4 cursor-pointer hover:scale-110 transition" onClick={() => window.open('https://www.google.com/maps/place/Chand+Motors+%26+Real+Estate/@33.6903169,73.0307376,17z/data=!4m14!1m7!3m6!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!2sChand+Motors+%26+Real+Estate!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh!3m5!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh?entry=ttu', '_blank')} />
            <h3 className="text-2xl font-black text-white mb-3">LOCATION</h3>
            <a href="https://www.google.com/maps/place/Chand+Motors+%26+Real+Estate/@33.6903169,73.0307376,17z/data=!4m14!1m7!3m6!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!2sChand+Motors+%26+Real+Estate!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh!3m5!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#ff3a52] mb-2 hover:text-[#ff6b7a] transition">
              Chand Motors G-9
            </a>
            <p className="text-gray-300 font-semibold">G-9, Islamabad</p>
            <p className="text-gray-300 font-semibold">Capital Territory, Pakistan</p>
            <button onClick={() => window.open('https://www.google.com/maps/place/Chand+Motors+%26+Real+Estate/@33.6903169,73.0307376,17z/data=!4m14!1m7!3m6!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!2sChand+Motors+%26+Real+Estate!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh!3m5!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh?entry=ttu', '_blank')} className="mt-3 btn-primary text-sm py-2 w-full">
              View on Google Maps
            </button>
          </motion.div>
        </div>

        {/* Contact Form & Business Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-lg p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">📧 SEND US A MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-white mb-2">FULL NAME *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c41e3a] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-white mb-2">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c41e3a] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-white mb-2">PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03005599479"
                    className="w-full bg-black/50 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c41e3a] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-white mb-2">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="w-full bg-black/50 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c41e3a] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-white mb-2">MESSAGE *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full bg-black/50 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c41e3a] transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 font-black text-lg py-4"
                >
                  <FaPaperPlane /> {loading ? '⏳ SENDING...' : '📤 SEND MESSAGE'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-lg p-5 sm:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2">
              <FaClock /> 🕒 BUSINESS HOURS
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[#ff3a52] text-sm font-black uppercase mb-1">📅 MONDAY - FRIDAY</p>
                <p className="text-white font-black text-lg">9:00 AM - 6:00 PM</p>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-[#ff3a52] text-sm font-black uppercase mb-1">📅 SATURDAY</p>
                <p className="text-white font-black text-lg">10:00 AM - 4:00 PM</p>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-500 text-sm font-black uppercase mb-1">📅 SUNDAY</p>
                <p className="text-gray-400 font-black text-lg">CLOSED</p>
              </div>
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <p className="text-[#ff6b35] font-semibold text-sm">24/7 Emergency Support</p>
                <button className="w-full btn-primary text-sm">
                  Call Emergency Line
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-lg overflow-hidden h-48 bg-black border border-gray-600">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.752747306088!2d73.0307376!3d33.6903125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf791e271ac9%3A0xbae56a2e4ca63ed9!2sChand%20Motors%20%26%20Real%20Estate!5e0!3m2!1sen!2s!4v1234567890"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
