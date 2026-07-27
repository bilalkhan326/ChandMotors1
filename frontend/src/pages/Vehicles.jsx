import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CarCard from '../components/CarCard'
import { carAPI } from '../services/api'
import { FaFilter } from 'react-icons/fa'
import formatPrice from '../utils/formatPrice'
import SEO from '../components/SEO'
import logoImage from '../../images/featured-cars/fc5.png'

// Sample cars data
const SAMPLE_CARS = [
  {
    _id: '1',
    name: 'Toyota Fortuner 2024',
    price: 65000,
    engineCC: '2.8L',
    capacity: '7',
    features: ['Hybrid Engine', 'Premium Interior', 'AI Assistant', 'All-Wheel Drive'],
    type: 'SUV',
    image: '/images/Toyota Fortuner.webp'
  },
  {
    _id: '2',
    name: 'Hyundai Tucson 2024',
    price: 75000,
    engineCC: '2.5L',
    capacity: '5',
    features: ['Twin Turbo Engine', 'Panoramic Roof', 'Night Vision', 'Adaptive Suspension'],
    type: 'SUV',
    image: '/images/Tucson-transparent-1.png'
  },
  {
    _id: '3',
    name: 'Toyota Hilux 2024',
    price: 55000,
    engineCC: '2.4L',
    capacity: '5',
    features: ['Electric Motor', '500km Range', 'Fast Charging', 'Eco Mode'],
    type: 'Truck',
    image: '/images/Hilux.jpg'
  },
  {
    _id: '4',
    name: 'Toyota Cultus 2024',
    price: 35000,
    engineCC: '1.8L',
    capacity: '5',
    features: ['Fuel Efficient', 'Compact Design', 'Modern Features', 'Safety Package'],
    type: 'Sedan',
    image: '/images/cultus.png'
  },
  {
    _id: '5',
    name: 'Wagon R 2024',
    price: 28000,
    engineCC: '1.0L',
    capacity: '5',
    features: ['3-Row Seating', 'Spacious Interior', 'Smart Storage', 'Entertainment System'],
    type: 'Hatchback',
    image: '/images/gray-wagonR.png'
  },
  {
    _id: '6',
    name: 'Toyota 2024',
    price: 45000,
    engineCC: '2.0L',
    capacity: '5',
    features: ['Premium Engine', 'Towing Capacity', 'All-Terrain', 'Bed Liner'],
    type: 'Sedan',
    image: '/images/toyota.png'
  },
]

const Vehicles = () => {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [loading, setLoading] = useState(false)

  // Get unique car types
  const carTypes = ['All', ...new Set(cars.map(car => car.type))]

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      try {
        const res = await carAPI.getAllCars()
        const fetched = res.data?.cars || []
        setCars(fetched)
        setFilteredCars(fetched)
      } catch (err) {
        console.error('Failed to fetch cars', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    filterCars()
  }, [searchTerm, selectedType, priceRange])

  const filterCars = () => {
    let filtered = cars

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(car => car.type === selectedType)
    }

    // Filter by price range
    filtered = filtered.filter(car =>
      car.price >= priceRange[0] && car.price <= priceRange[1]
    )

    setFilteredCars(filtered)
  }

  return (
    <div className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title="Vehicle Inventory"
        description="Browse premium vehicles available at Chand Motors G-9 with responsive filters and search."
        keywords={['Chand Motors G-9', 'vehicles', 'car inventory', 'premium cars']}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">Our Inventory</h1>
          <p className="section-subtitle">
            Explore our premium collection of vehicles, each designed for performance and excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <aside className="glass-effect rounded-lg p-4 sm:p-6 space-y-6 lg:sticky lg:top-24" aria-label="Vehicle filters">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaFilter /> Filters
                </h3>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Search</label>
                <div className="relative">
                  <img
                    src={logoImage}
                    alt="Chand Motors G-9 logo"
                    loading="lazy"
                    decoding="async"
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full object-contain bg-black/60 p-0.5"
                  />
                  <input
                    type="text"
                    placeholder="Search Chand Motors G-9 vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search vehicles"
                    className="w-full bg-black/60 border border-gray-600 rounded px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Vehicle Type</label>
                <div className="space-y-2">
                  {carTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="cursor-pointer"
                      />
                      <span className="text-gray-300 group-hover:text-[#ff6b35] transition">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Price Range</label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('All')
                  setPriceRange([0, 100000])
                }}
                className="w-full btn-secondary text-center"
              >
                Clear Filters
              </button>
            </aside>
          </motion.div>

          {/* Cars Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {loading ? (
              <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6b35]"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div>
                <p className="text-gray-400 mb-6">
                  Showing {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No vehicles found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Vehicles
