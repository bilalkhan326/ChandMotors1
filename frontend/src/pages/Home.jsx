import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaUsers, FaCar, FaClock } from 'react-icons/fa'
import heroImg from '../Tucson-transparent-1.png'
import CarCard from '../components/CarCard'
import { carAPI } from '../services/api'
import { toast } from 'react-toastify'
import SEO from '../components/SEO'

// Sample data
const FEATURED_CARS = [
  {
    _id: '1',
    name: 'Toyota Fortuner 2024',
    price: 65000,
    engineCC: '2.8L',
    capacity: '7',
    features: ['Hybrid Engine', 'Premium Interior', 'AI Assistant', 'All-Wheel Drive'],
    image: '/images/Toyota Fortuner.webp'
  },
  {
    _id: '2',
    name: 'Hyundai Tucson 2024',
    price: 75000,
    engineCC: '2.5L',
    capacity: '5',
    features: ['Twin Turbo Engine', 'Panoramic Roof', 'Night Vision', 'Adaptive Suspension'],
    image: '/images/Tucson-transparent-1.png'
  },
  {
    _id: '3',
    name: 'Toyota Hilux 2024',
    price: 55000,
    engineCC: '2.4L',
    capacity: '5',
    features: ['Electric Motor', '500km Range', 'Fast Charging', 'Eco Mode'],
    image: '/images/Hilux.jpg'
  },
]

const Home = () => {
  const [cars, setCars] = useState(FEATURED_CARS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await carAPI.getAllCars({ limit: 3 })
        if (response?.data?.cars && response.data.cars.length > 0) {
          setCars(response.data.cars)
        }
      } catch (error) {
        // fallback to sample data
      } finally {
        setLoading(false)
      }
    }

    // fetchCars() // uncomment when backend is available
  }, [])

  return (
    <div className="w-full">
      <SEO
        title="Chand Motors G-9"
        description="Explore premium vehicles, service offerings, and trusted automotive support at Chand Motors G-9 in Islamabad."
        keywords={['Chand Motors G-9', 'premium vehicles', 'Islamabad car dealership', 'vehicle showroom']}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AutoDealer',
          name: 'Chand Motors G-9',
          url: import.meta.env.VITE_SITE_URL || 'https://www.chandmotors.pk',
          telephone: '+923005599479',
          email: 'info@chandmotors.pk',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'G-9',
            addressLocality: 'Islamabad',
            addressCountry: 'PK'
          },
          areaServed: 'Islamabad',
          image: '/images/Tucson-transparent-1.png'
        }}
      />
      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                <span className="gradient-text">Elevate Your Drive</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed font-semibold max-w-2xl">
                Premium vehicles and world-class service at Chand Motors G-9. Experience the perfect blend of luxury, performance, and reliability.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link to="/vehicles" className="btn-primary flex items-center gap-2 text-lg font-bold">
                  Explore Vehicles <FaArrowRight />
                </Link>
                <button className="btn-secondary text-lg font-bold">
                  Schedule Service
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-700">
                <div>
                  <p className="text-3xl font-bold text-[#c41e3a]">500+</p>
                  <p className="text-gray-300 text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c41e3a]">20+</p>
                  <p className="text-gray-300 text-sm">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#c41e3a]">24/7</p>
                  <p className="text-gray-300 text-sm">Support Available</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl shadow-[#c41e3a]/35 border-2 border-[#c41e3a]/30 bg-black">
                <img
                  src={heroImg}
                  alt="Hyundai Tucson"
                  className="w-full h-full object-contain transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#c41e3a] to-[#ff3a52] rounded-full">
                  <p className="text-white font-black text-sm">PREMIUM</p>
                </div>
              </div>
              <p className="text-center text-gray-300 text-sm mt-4 animate-bounce">Scroll to explore</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section id="vehicles" className="w-full py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              OUR COLLECTION
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Premium Vehicles
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-subtitle"
            >
              Discover our curated selection of premium vehicles, each engineered for performance and designed for excellence.
            </motion.p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c41e3a]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/vehicles" className="btn-primary">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Services removed from landing page - see Services page for details */}

      {/* About Section */}
      <section id="about" className="w-full py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/images/Hilux.jpg"
                alt="About CMotors"
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="section-title">Your Trusted Automotive Partner</h2>
              <p className="text-gray-300 leading-relaxed">
                For over 20 years, Chand Motors G-9 has been serving customers with premium vehicles and exceptional service. Our commitment to excellence has made us a trusted name in the automotive industry.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe in building long-term relationships with our customers. Every vehicle in our inventory is carefully selected and thoroughly inspected to ensure the highest quality standards.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our team of certified technicians and knowledgeable sales professionals are dedicated to providing you with an exceptional experience every time you visit.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b border-gray-700">
                <div>
                  <p className="text-3xl font-bold gradient-text">20+</p>
                  <p className="text-gray-300 text-sm">Years in Business</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">500+</p>
                  <p className="text-gray-300 text-sm">Vehicles Sold</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">98%</p>
                  <p className="text-gray-300 text-sm">Customer Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h3 className="text-center text-2xl font-bold mb-12 text-white">Our Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'Excellence', desc: 'We maintain the highest standards in vehicle quality and customer service.' },
                { title: 'Customer First', desc: 'Your satisfaction is our priority in every interaction and transaction.' },
                { title: 'Innovation', desc: 'We stay ahead with the latest automotive technology and practices.' },
                { title: 'Reliability', desc: 'Trust us to deliver consistent, dependable service every single time.' },
              ].map((value, idx) => (
                <div key={idx} className="glass-effect rounded-lg p-6 text-center card-hover">
                  <h4 className="text-lg font-bold text-[#c41e3a] mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
