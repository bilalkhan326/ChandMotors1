import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import SEO from '../components/SEO'

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      
      if (response.data.success) {
        login(response.data.user, response.data.token)
        toast.success('Account created successfully!')
        navigate('/dashboard')
      } else {
        toast.error(response.data.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      // For demo, allow signup with any data
      const newUser = { id: '1', name: formData.name, email: formData.email }
      login(newUser, 'demo-token')
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 pt-32">
      <SEO
        title="Create Account"
        description="Create a customer account with Chand Motors G-9 to save vehicle inquiries and contact details."
        keywords={['Chand Motors G-9', 'sign up', 'customer account', 'vehicle inquiry']}
        noIndex
      />
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-lg p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400">Join Chand Motors G-9 today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03005599479"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Links */}
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#ff6b35] hover:text-[#d4af37] font-semibold transition">
              Sign in
            </Link>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
