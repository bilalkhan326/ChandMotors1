import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCar, FaEdit, FaTrash, FaPlus, FaImage, FaSignOutAlt, FaMapMarkerAlt, FaFolderOpen, FaEnvelope, FaTimes } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { carAPI, contactAPI, settingsAPI, uploadAPI, userAPI } from '../services/api'
import formatPrice from '../utils/formatPrice'
import SEO from '../components/SEO'

const defaultCarForm = {
  name: '',
  model: '',
  price: '',
  engineCC: '',
  capacity: '',
  type: '',
  features: '',
  image: ''
}

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('cars')
  const [cars, setCars] = useState([])
  const [contacts, setContacts] = useState([])
  const [bookings, setBookings] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [logoImage, setLogoImage] = useState('../../images/featured-cars/fc5.png')
  const [heroImage, setHeroImage] = useState('../Tucson-transparent-1.png')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [loadingCars, setLoadingCars] = useState(false)
  const [loadingContacts, setLoadingContacts] = useState(false)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [formData, setFormData] = useState(defaultCarForm)
  
  // File input refs
  const carImageInputRef = useRef(null)
  const logoImageInputRef = useRef(null)
  const heroImageInputRef = useRef(null)

  const fetchCars = async () => {
    setLoadingCars(true)
    try {
      const response = await carAPI.getAllCars({ limit: 100 })
      setCars(response.data.cars || [])
    } catch (error) {
      console.error('Fetch cars error:', error)
      toast.error('Unable to load car inventory')
    } finally {
      setLoadingCars(false)
    }
  }

  const fetchContacts = async () => {
    setLoadingContacts(true)
    try {
      const response = await contactAPI.getAllContacts()
      setContacts(response.data.contacts || [])
    } catch (error) {
      console.error('Fetch contacts error:', error)
      toast.error('Unable to load messages')
    } finally {
      setLoadingContacts(false)
    }
  }

  const fetchBookings = async () => {
    setLoadingBookings(true)
    try {
      const response = await userAPI.getBookings()
      setBookings(response.data.bookings || [])
    } catch (error) {
      console.error('Fetch bookings error:', error)
      toast.error('Unable to load bookings')
    } finally {
      setLoadingBookings(false)
    }
  }

  const handleBookingStatusChange = async (bookingId, status) => {
    try {
      const response = await userAPI.updateBookingStatus(bookingId, status)
      setBookings(prev => prev.map((booking) => (
        booking._id === bookingId ? response.data.booking : booking
      )))
      toast.success('Booking status updated')
    } catch (error) {
      console.error('Update booking status error:', error)
      toast.error(error.response?.data?.message || 'Failed to update booking status')
    }
  }

  // Use relative paths for /uploads so Vite proxy handles requests in development

  useEffect(() => {
    fetchCars()
    fetchContacts()
    fetchBookings()
  }, [])

  // Handle file selection for car image - Upload to server
  const handleCarImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      toast.loading('📤 Uploading image...')
      const response = await uploadAPI.uploadCarImage(file)
      const imagePath = response.data.imagePath
      setFormData(prev => ({
        ...prev,
        image: imagePath
      }))
      toast.dismiss()
      toast.success(`✅ Image uploaded: ${file.name}`)
    } catch (error) {
      toast.dismiss()
      console.error('Upload car image error:', error)
      toast.error(`❌ Upload failed: ${error.response?.data?.message || error.message}`)
    }
    // Reset input
    if (carImageInputRef.current) {
      carImageInputRef.current.value = ''
    }
  }

  // Handle file selection for logo image - Upload to server
  const handleLogoImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      toast.loading('📤 Uploading logo...')
      const response = await uploadAPI.uploadLogo(file)
      const imagePath = response.data.imagePath
      setLogoImage(imagePath)
      toast.dismiss()
      toast.success(`✅ Logo uploaded: ${file.name}`)
    } catch (error) {
      toast.dismiss()
      console.error('Upload logo error:', error)
      toast.error(`❌ Logo upload failed: ${error.response?.data?.message || error.message}`)
    }
    if (logoImageInputRef.current) {
      logoImageInputRef.current.value = ''
    }
  }

  // Save logo image to backend
  const handleSaveLogo = async () => {
    try {
      await settingsAPI.updateSettings({ logo: logoImage })
      toast.success('✅ Logo image saved successfully!')
      // Notify other components (Logo) to reload settings
      try {
        window.dispatchEvent(new CustomEvent('settings:updated', { detail: { logo: logoImage } }))
      } catch (e) {}
    } catch (error) {
      console.error('Save logo error:', error)
      toast.error('Failed to save logo image')
    }
  }

  // Handle file selection for hero image - Upload to server
  const handleHeroImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      toast.loading('📤 Uploading hero image...')
      const response = await uploadAPI.uploadHero(file)
      const imagePath = response.data.imagePath
      setHeroImage(imagePath)
      toast.dismiss()
      toast.success(`✅ Hero image uploaded: ${file.name}`)
    } catch (error) {
      toast.dismiss()
      console.error('Upload hero error:', error)
      toast.error(`❌ Hero upload failed: ${error.response?.data?.message || error.message}`)
    }
    if (heroImageInputRef.current) {
      heroImageInputRef.current.value = ''
    }
  }

  // Save hero image to backend
  const handleSaveHero = async () => {
    try {
      await settingsAPI.updateSettings({ heroImage: heroImage })
      toast.success('✅ Landing hero image saved successfully!')
    } catch (error) {
      console.error('Save hero error:', error)
      toast.error('Failed to save hero image')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCar = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.type) {
      toast.error('Please fill in: Car Name, Price, and Type')
      return
    }
    if (!formData.image) {
      toast.error('Please select a car image')
      return
    }
    if (!formData.engineCC) {
      toast.error('Please enter Engine CC (e.g., 2.0L)')
      return
    }

    const payload = {
      ...formData,
      price: parseInt(formData.price, 10),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      inStock: true
    }

    try {
      const response = await carAPI.createCar(payload)
      toast.success('✅ Car added successfully!')
      setFormData(defaultCarForm)
      setShowAddForm(false)
      // Refresh the entire cars list from backend
      await fetchCars()
    } catch (error) {
      console.error('Add car error:', error)
      toast.error(error.response?.data?.message || 'Failed to add car')
    }
  }

  const handleEditCar = (car) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      model: car.model || '',
      price: car.price.toString(),
      engineCC: car.engineCC,
      capacity: car.capacity,
      type: car.type,
      features: car.features.join(', '),
      image: car.image
    })
    setShowAddForm(true)
  }

  const handleUpdateCar = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.type) {
      toast.error('Please fill in: Car Name, Price, and Type')
      return
    }
    if (!formData.engineCC) {
      toast.error('Please enter Engine CC (e.g., 2.0L)')
      return
    }

    if (!editingCar) {
      toast.error('No car selected to update')
      return
    }

    const payload = {
      ...formData,
      price: parseInt(formData.price, 10),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      inStock: true
    }

    try {
      const response = await carAPI.updateCar(editingCar._id, payload)
      toast.success('✅ Car updated successfully!')
      setEditingCar(null)
      setShowAddForm(false)
      setFormData(defaultCarForm)
      // Refresh the entire cars list from backend
      await fetchCars()
    } catch (error) {
      console.error('Update car error:', error)
      toast.error(error.response?.data?.message || 'Failed to update car')
    }
  }

  const handleDeleteCar = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return
    }

    try {
      await carAPI.deleteCar(carId)
      toast.success('✅ Car deleted successfully!')
      // Refresh the entire cars list from backend
      await fetchCars()
    } catch (error) {
      console.error('Delete car error:', error)
      toast.error(error.response?.data?.message || 'Failed to delete car')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.info('Logged out successfully')
  }

  return (
    <div className="w-full min-h-screen bg-black py-20 pt-24">
      <SEO
        title="Admin Dashboard"
        description="Manage Chand Motors G-9 vehicle inventory, logo, hero image, business details, and customer messages."
        keywords={['Chand Motors G-9', 'admin dashboard', 'inventory management', 'customer messages']}
        noIndex
      />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 glass-effect rounded-lg p-5 sm:p-6"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400 font-semibold">Welcome, Admin - Manage Vehicle Inventory</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#c41e3a] hover:bg-[#8b0000] text-white font-black px-5 sm:px-6 py-3 rounded-lg transition-all transform hover:scale-105"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base ${
              activeTab === 'cars'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaCar className="inline mr-2" /> Manage Cars
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base ${
              activeTab === 'logo'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaImage className="inline mr-2" /> Logo Image
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base ${
              activeTab === 'hero'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaImage className="inline mr-2" /> Landing Hero
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base ${
              activeTab === 'location'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaMapMarkerAlt className="inline mr-2" /> Location Info
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base col-span-2 lg:col-span-1 ${
              activeTab === 'messages'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaEnvelope className="inline mr-2" /> Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 sm:px-6 py-3 font-black rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base col-span-2 lg:col-span-1 ${
              activeTab === 'bookings'
                ? 'bg-[#c41e3a] text-white'
                : 'bg-black/60 text-gray-300 hover:bg-black/70'
            }`}
          >
            <FaCar className="inline mr-2" /> Bookings ({bookings.length})
          </button>
        </div>

        {/* Cars Management Tab */}
        {activeTab === 'cars' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add/Edit Car Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-lg p-8 space-y-4"
              >
                <h2 className="text-3xl font-black text-white mb-6">
                  {editingCar ? '✏️ Edit Car' : '➕ Add New Car'}
                </h2>
                <form onSubmit={editingCar ? handleUpdateCar : handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-black mb-2">Car Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Toyota Fortuner 2024"
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]" 
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Price (PKR) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 65000"
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Car Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="e.g., 2024, Gen 3, V6"
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Car Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    >
                      <option value="">Select Type</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Truck">Truck</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Engine CC</label>
                    <input
                      type="text"
                      name="engineCC"
                      value={formData.engineCC}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.0L"
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Capacity (Seats)</label>
                    <input
                      type="text"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 5"
                      className="w-full bg-black/70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-black mb-2">Image *</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={carImageInputRef}
                        onChange={handleCarImageSelect}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => carImageInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#c41e3a]/20 hover:bg-[#c41e3a]/40 border border-[#c41e3a] text-[#c41e3a] font-black py-2 rounded transition-all"
                      >
                        <FaFolderOpen /> Browse Image
                      </button>
                    </div>
                    {formData.image && (
                      <p className="text-xs text-gray-400 mt-2">Selected: {formData.image}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white font-black mb-2">Features</label>
                    <textarea
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      placeholder="Enter features separated by commas"
                      rows="2"
                      className="w-full bg-black/50 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-[#c41e3a]"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#c41e3a] hover:bg-[#8b0000] text-white font-black py-3 rounded-lg transition-all transform hover:scale-105"
                    >
                      {editingCar ? '💾 Update Car' : '➕ Add Car'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingCar(null)
                        setFormData(defaultCarForm)
                      }}
                      className="flex-1 bg-black/50 hover:bg-black/70 text-white font-black py-3 rounded-lg transition-all"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Add New Car Button */}
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-gradient-to-r from-[#c41e3a] to-[#ff3a52] hover:shadow-xl hover:shadow-[#c41e3a]/50 text-white font-black py-4 rounded-lg transition-all transform hover:scale-105 text-lg"
              >
                <FaPlus className="inline mr-2" /> Add New Car to Inventory
              </button>
            )}

            {/* Cars List */}
            {loadingCars ? (
              <div className="text-center text-white font-black py-12">
                Loading car inventory...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car, index) => (
                  <motion.div
                    key={car._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-[#c41e3a]/30 transition-all"
                  >
                    <div className="h-48 bg-black/50 flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          typeof car.image === 'string'
                            ? (
                                car.image.startsWith('data:')
                                  ? car.image
                                  : (car.image.startsWith('/') ? encodeURI(car.image) : `/images/${car.image}`)
                              )
                            : car.image
                        }
                        alt={car.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2214%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-xl font-black text-white line-clamp-2">{car.name}</h3>
                      {car.model && (
                        <p className="text-sm text-gray-400">Model: {car.model}</p>
                      )}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400 font-semibold">Price</p>
                          <p className="text-[#ff3a52] font-black">{formatPrice(car.price)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-semibold">Type</p>
                          <p className="text-white font-black">{car.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-semibold">Engine</p>
                          <p className="text-white font-black">{car.engineCC}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-semibold">Seats</p>
                          <p className="text-white font-black">{car.capacity}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleEditCar(car)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 font-black py-2 rounded transition-all"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 font-black py-2 rounded transition-all"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Logo Image Tab */}
        {activeTab === 'logo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-lg p-8 space-y-6"
          >
            <h2 className="text-3xl font-black text-white mb-6">🎨 Manage Logo Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-black mb-2 text-lg">Logo Image</label>
                  <input
                    type="file"
                    ref={logoImageInputRef}
                    onChange={handleLogoImageSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => logoImageInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-[#c41e3a] hover:bg-[#8b0000] text-white font-black py-3 rounded-lg transition-all transform hover:scale-105"
                  >
                    <FaFolderOpen /> Select Logo Image
                  </button>
                  {logoImage && (
                    <p className="text-xs text-gray-400 mt-3">Current: {logoImage}</p>
                  )}
                </div>
                <button
                  onClick={handleSaveLogo}
                  className="w-full bg-gradient-to-r from-[#c41e3a] to-[#ff3a52] hover:shadow-xl text-white font-black py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  💾 Save Logo Image
                </button>
              </div>
              <div className="space-y-4">
                <label className="block text-white font-black mb-2 text-lg">Logo Preview</label>
                <div className="w-full h-52 sm:h-64 bg-black border-2 border-[#c41e3a]/30 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      typeof logoImage === 'string'
                            ? (
                            logoImage.startsWith('data:')
                              ? logoImage
                              : (logoImage.startsWith('/') ? logoImage : `/images/${logoImage}`)
                          )
                        : logoImage
                    }
                    alt="Logo Preview"
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage Not Found%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Landing Hero Image Tab */}
        {activeTab === 'hero' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-lg p-8 space-y-6"
          >
            <h2 className="text-3xl font-black text-white mb-6">🏎️ Manage Landing Page Hero Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-black mb-2 text-lg">Hero Image</label>
                  <input
                    type="file"
                    ref={heroImageInputRef}
                    onChange={handleHeroImageSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => heroImageInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-[#c41e3a] hover:bg-[#8b0000] text-white font-black py-3 rounded-lg transition-all transform hover:scale-105"
                  >
                    <FaFolderOpen /> Select Hero Image
                  </button>
                  {heroImage && (
                    <p className="text-xs text-gray-400 mt-3">Current: {heroImage}</p>
                  )}
                </div>
                <button
                  onClick={handleSaveHero}
                  className="w-full bg-gradient-to-r from-[#c41e3a] to-[#ff3a52] hover:shadow-xl text-white font-black py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  💾 Save Hero Image
                </button>
              </div>
              <div className="space-y-4">
                <label className="block text-white font-black mb-2 text-lg">Hero Preview</label>
                <div className="w-full h-52 sm:h-64 bg-black border-2 border-[#c41e3a]/30 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      typeof heroImage === 'string'
                            ? (
                            heroImage.startsWith('data:')
                              ? heroImage
                              : (heroImage.startsWith('/') ? heroImage : `/images/${heroImage}`)
                          )
                        : heroImage
                    }
                    alt="Hero Preview"
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage Not Found%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'location' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-lg p-8 space-y-6"
          >
            <h2 className="text-3xl font-black text-white mb-6">📍 Business Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-black mb-2 text-lg">Company Name</label>
                  <p className="text-2xl font-black text-[#c41e3a]">Chand Motors G-9</p>
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-lg">Address</label>
                  <p className="text-lg font-semibold text-gray-300">G-9, Islamabad</p>
                  <p className="text-lg font-semibold text-gray-300">Capital Territory, Pakistan</p>
                </div>
                <div>
                  <label className="block text-white font-black mb-2 text-lg">Contact</label>
                  <p className="text-lg font-semibold text-gray-300">📞 +92-51-XXXX-XXXX</p>
                  <p className="text-lg font-semibold text-gray-300">📧 info@chandmotors.pk</p>
                </div>
              </div>
              <div className="bg-black/50 rounded-lg p-6 space-y-4">
                <h3 className="text-2xl font-black text-white mb-4">📋 Location Details</h3>
                <div className="text-gray-300 font-semibold space-y-2">
                  <p>✓ Premium vehicle showroom in G-9 Islamabad</p>
                  <p>✓ Easy access from main city roads</p>
                  <p>✓ Ample parking for test drives</p>
                  <p>✓ Modern service center on premises</p>
                  <p>✓ Professional admin staff and mechanics</p>
                  <p>✓ Authentic luxury vehicle selection</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-lg p-8">
              <h2 className="text-3xl font-black text-white mb-6">
                📧 Customer Messages ({contacts.length})
              </h2>

              {loadingContacts ? (
                <div className="text-center text-gray-300 font-black py-12">
                  Loading messages...
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center text-gray-400 font-semibold py-12">
                  No messages yet. Customers will appear here when they send messages.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {contacts.map((contact, index) => (
                    <motion.div
                      key={contact._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedContact(selectedContact?._id === contact._id ? null : contact)}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-4 cursor-pointer transition-all border border-gray-600 hover:border-[#c41e3a]"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-white font-black text-lg">{contact.fullName}</p>
                          <p className="text-gray-400 text-sm">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-gray-400 text-sm">📞 {contact.phone}</p>
                          )}
                          {contact.subject && (
                            <p className="text-[#ff3a52] font-semibold mt-2">Subject: {contact.subject}</p>
                          )}
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(contact.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-2xl">{selectedContact?._id === contact._id ? '▼' : '▶'}</span>
                      </div>

                      {selectedContact?._id === contact._id && (
                        <div className="mt-4 pt-4 border-t border-gray-600">
                          <p className="text-gray-200 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-lg p-8">
              <h2 className="text-3xl font-black text-white mb-6">
                📅 Service Bookings ({bookings.length})
              </h2>

              {loadingBookings ? (
                <div className="text-center text-gray-300 font-black py-12">
                  Loading bookings...
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center text-gray-400 font-semibold py-12">
                  No bookings yet. Requests from the Services page will appear here.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedBooking(selectedBooking?._id === booking._id ? null : booking)}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-4 cursor-pointer transition-all border border-gray-600 hover:border-[#c41e3a]"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-black text-lg">{booking.customerName}</p>
                          <p className="text-gray-400 text-sm">{booking.customerEmail}</p>
                          <p className="text-gray-400 text-sm">📞 {booking.customerPhone}</p>
                          <p className="text-[#ff3a52] font-semibold mt-2">Service: {booking.serviceName}</p>
                          <p className="text-gray-300 text-sm">Vehicle: {booking.vehicleModel}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            Preferred Date: {booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="text-right shrink-0 space-y-2">
                          <p className="text-white font-black">{booking.status}</p>
                          <select
                            value={booking.status}
                            onChange={(e) => handleBookingStatusChange(booking._id, e.target.value)}
                            className="bg-black/60 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c41e3a]"
                            aria-label={`Update status for ${booking.customerName}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <p className="text-[#ff3a52] font-bold">{booking.price ? `PKR ${booking.price}` : 'N/A'}</p>
                        </div>
                      </div>

                      {selectedBooking?._id === booking._id && (
                        <div className="mt-4 pt-4 border-t border-gray-600 space-y-2">
                          <p className="text-gray-300"><span className="text-gray-500">Notes:</span> {booking.notes || 'None'}</p>
                          <p className="text-gray-300"><span className="text-gray-500">Submitted:</span> {new Date(booking.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
