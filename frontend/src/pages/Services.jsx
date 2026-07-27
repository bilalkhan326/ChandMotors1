import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { serviceAPI } from '../services/api'
import FAQModal from '../components/FAQModal'
import formatPrice from '../utils/formatPrice'
import SEO from '../components/SEO'

const SERVICES = [
  {
    id: 1,
    title: 'Excise Clearance & Documentation',
    description: 'We manage excise clearance, submit tax filings, and coordinate with authorities to obtain clearance certificates.',
    features: ['Excise tax filing', 'Clearance certificate', 'Paperwork submission', 'Authority liaison'],
    price: 100,
    icon: '🧾'
  },
  {
    id: 2,
    title: 'Ownership Transfer (Title Transfer)',
    description: 'Full-service ownership transfer including NOC issuance, title transfer, and registration updates.',
    features: ['NOC processing', 'Title transfer', 'Registration update', 'Transfer paperwork'],
    price: 150,
    icon: '🔁'
  },
  {
    id: 3,
    title: 'Vehicle Registration & Deregistration',
    description: 'Register new vehicles or assist with deregistration for imports/exports and formal removals.',
    features: ['New registration', 'Deregistration', 'Number plate assistance', 'Document filing'],
    price: 80,
    icon: '✅'
  },
  {
    id: 4,
    title: 'Document Verification & Notarization',
    description: 'Official verification and notarization of all vehicle-related documents to ensure legal compliance.',
    features: ['Owner ID verification', 'Document notarization', 'Records audit', 'Compliance check'],
    price: 60,
    icon: '🖋️'
  },
  {
    id: 5,
    title: 'Excise Tax Calculation & Payment Assistance',
    description: 'We calculate excise duties accurately and assist with payments and receipt handling.',
    features: ['Tax calculation', 'Payment assistance', 'Receipt handling', 'Tax advisory'],
    price: 120,
    icon: '💰'
  },
]

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [showFAQ, setShowFAQ] = useState(false)
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    serviceName: '',
    servicePrice: 0,
    vehicleModel: '',
    customerName: '',
    email: '',
    phone: '',
    preferredDate: '',
    notes: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBookService = async (service) => {
    setSelectedService(service)
    setBookingData(prev => ({
      ...prev,
      serviceId: String(service.id),
      serviceName: service.title,
      servicePrice: service.price
    }))
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()

    if (!bookingData.customerName || !bookingData.email || !bookingData.phone || !bookingData.vehicleModel || !bookingData.preferredDate) {
      toast.error('Please fill in all required fields')
      return
    }
    
    try {
      const response = await serviceAPI.bookService({
        serviceId: bookingData.serviceId,
        serviceName: bookingData.serviceName,
        servicePrice: bookingData.servicePrice,
        customerName: bookingData.customerName,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        vehicleModel: bookingData.vehicleModel,
        preferredDate: bookingData.preferredDate,
        notes: bookingData.notes
      })

      toast.success(response.data?.message || 'Service booking requested! We will contact you soon.')
      setSelectedService(null)
      setBookingData({
        serviceId: '',
        serviceName: '',
        servicePrice: 0,
        vehicleModel: '',
        customerName: '',
        email: '',
        phone: '',
        preferredDate: '',
        notes: ''
      })
    } catch (error) {
      toast.error('Failed to book service. Please try again.')
    }
  }

  return (
    <div className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title="Excise & Transfer Services"
        description="Book excise clearance, title transfer, registration, and verification services with Chand Motors G-9."
        keywords={['Chand Motors G-9', 'excise services', 'vehicle transfer', 'registration']}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
          <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title mb-4">Excise & Transfer Services</h1>
          <p className="section-subtitle">
            We specialize in excise clearance, ownership transfers, registrations, and official document handling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-effect rounded-lg p-5 sm:p-6 card-hover flex flex-col"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                    <FaCheck className="text-[#ff6b35]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <button
                  onClick={() => handleBookService(service)}
                  className="w-full btn-primary"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-lg p-5 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Book {selectedService.title}
                </h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-[#ff6b35] transition text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={bookingData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Vehicle Model *</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={bookingData.vehicleModel}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                      placeholder="Honda Civic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                      placeholder="03005599479"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={bookingData.preferredDate}
                    onChange={handleInputChange}
                    onFocus={(e) => e.currentTarget.showPicker?.()}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    aria-label="Preferred service date"
                    className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-black/30 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ff6b35] transition"
                    placeholder="Any additional information..."
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-lg p-6 sm:p-8 md:p-12 text-center mt-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Need More Information?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contact our team or open the FAQ to learn about required documents, timelines, and fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923005599479" className="btn-primary flex items-center gap-2">
                <FaPhone /> Call Us
              </a>
              <a href="mailto:info@chandmotors.pk" className="btn-secondary flex items-center gap-2">
                <FaEnvelope /> Email Us
              </a>
              <button onClick={() => setShowFAQ(true)} className="btn-secondary flex items-center gap-2">
                FAQ — Process Details
              </button>
            </div>
          </motion.div>

          {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
      </div>
    </div>
  )
}

export default Services
