import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaPhone, FaEnvelope } from 'react-icons/fa'
import formatPrice from '../utils/formatPrice'
import { carAPI } from '../services/api'
import { toast } from 'react-toastify'
import SEO from '../components/SEO'

// Sample car details
const SAMPLE_CAR_DETAILS = {
  _id: '1',
  name: 'Toyota Fortuner 2024',
  price: 65000,
  engineCC: '2.8L',
  capacity: '7 Seats',
  features: ['Hybrid Engine', 'Premium Interior', 'AI Assistant', 'All-Wheel Drive', 'Panoramic Sunroof', 'Advanced Safety'],
  image: '/images/Toyota Fortuner.webp',
  description: 'Experience ultimate luxury and performance with our flagship Toyota Fortuner. Engineered with precision and crafted for excellence.',
  specifications: {
    engine: 'Hybrid V6',
    transmission: 'Automatic 8-Speed',
    fuelType: 'Hybrid',
    mpg: '35 MPG',
    acceleration: '0-60 in 4.2s',
    topSpeed: '155 MPH',
    seating: '7 Passengers',
    trunkSpace: '16.5 cu ft'
  }
}

const VehicleDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(SAMPLE_CAR_DETAILS)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true)
        const response = await carAPI.getCarById(id)
        setCar(response.data.car || SAMPLE_CAR_DETAILS)
      } catch (error) {
        console.error('Error fetching car:', error)
        // Use sample data on error
      } finally {
        setLoading(false)
      }
    }

    // Fetch the specific car by id
    if (id) {
      fetchCar()
    }
  }, [id])

  const handleTestDrive = () => {
    toast.info('Test drive request sent! We will contact you soon.')
  }

  const handleContact = () => {
    toast.info('Contact form opened!')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c41e3a]"></div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title={car?.name ? car.name : 'Vehicle Details'}
        description={car?.description || 'View premium vehicle details, features, and contact options at Chand Motors G-9.'}
        keywords={['Chand Motors G-9', 'vehicle details', 'car features', 'premium vehicle']}
        image={typeof car?.image === 'string' ? car.image : '/images/Tucson-transparent-1.png'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/vehicles')}
          className="flex items-center gap-2 text-[#c41e3a] hover:text-[#ff3a52] transition mb-8"
        >
          <FaArrowLeft /> Back to Vehicles
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
            {car.name}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Detailed specifications, features, and contact options for this vehicle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <article className="glass-effect rounded-lg overflow-hidden mb-6">
              <img
                src={
                  typeof car.image === 'string'
                      ? (car.image.startsWith('data:') ? car.image : (car.image.startsWith('/') ? encodeURI(car.image) : `/images/${car.image}`))
                    : car.image
                }
                alt={car.name}
                className="w-full h-72 sm:h-96 md:h-[500px] object-cover"
                loading="eager"
                decoding="async"
              />
            </article>

            {/* Tabs */}
            <div className="glass-effect rounded-lg">
              <div className="flex border-b border-gray-700">
                {['overview', 'specifications', 'features'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-4 text-center font-semibold transition capitalize ${
                      activeTab === tab
                        ? 'text-[#c41e3a] border-b-2 border-[#c41e3a]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      {car.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-black/30 rounded p-4">
                        <p className="text-gray-400 text-xs uppercase mb-1">Engine</p>
                        <p className="text-white font-semibold text-lg">{car.engineCC}</p>
                      </div>
                      <div className="bg-black/30 rounded p-4 sm:col-span-2">
                        <p className="text-gray-400 text-xs uppercase mb-1">Capacity</p>
                        <p className="text-white font-semibold text-lg">{car.capacity}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="space-y-4">
                    {Object.entries(car.specifications || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {car.features && car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-black/30 rounded">
                        <span className="text-[#c41e3a] text-lg">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <aside className="glass-effect rounded-lg p-5 sm:p-8 lg:sticky lg:top-24 space-y-6" aria-label="Vehicle contact and quick details">
              {/* Price */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Starting Price</p>
                <p className="text-4xl font-bold gradient-text">
                  {formatPrice(car.price)}
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleTestDrive}
                  className="w-full btn-primary"
                >
                  Book Test Drive
                </button>
                <button
                  onClick={handleContact}
                  className="w-full btn-secondary"
                >
                  Contact Us
                </button>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-700 pt-6 space-y-4">
                <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                <a
                  href="tel:+923005599479"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#ff6b35] transition"
                >
                  <FaPhone /> 03005599479
                </a>
                <a
                  href="mailto:info@chandmotors.pk"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#ff6b35] transition"
                >
                  <FaEnvelope /> info@chandmotors.pk
                </a>
              </div>

              {/* Quick Specs */}
              <div className="border-t border-gray-700 pt-6 space-y-3">
                <h4 className="text-white font-semibold mb-4">Quick Overview</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Engine:</span> {car.specifications?.engine}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Transmission:</span> {car.specifications?.transmission}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Fuel Type:</span> {car.specifications?.fuelType}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">MPG:</span> {car.specifications?.mpg}
                  </p>
                </div>
              </div>
            </aside>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetails
