import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import { toast } from 'react-toastify'
import SEO from '../components/SEO'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Call backend API to authenticate
      const response = await authAPI.login(formData)
      const { user, token } = response.data

      if (user.role !== 'admin') {
        toast.error('Access denied. Admin credentials required')
        setLoading(false)
        return
      }

      // Store token and user in context and localStorage
      login(user, token)
      toast.success('Admin login successful')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 pt-32">
      <SEO
        title="Admin Login"
        description="Secure admin login for Chand Motors G-9 inventory, settings, and customer management."
        keywords={['Chand Motors G-9', 'admin login', 'car dealership dashboard', 'inventory management']}
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
            <h1 className="text-4xl font-black text-white">Admin Panel</h1>
            <p className="text-gray-400 font-semibold">Chand Motors G-9 Administration</p>
            <p className="text-sm text-gray-500 mt-2">Manage vehicle inventory, images, and descriptions</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full bg-black/30 border border-gray-600 rounded px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Social Login removed - admin-only access */}

          {/* Links */}
          <div className="text-center space-y-2 text-sm">
            <p className="text-gray-400 text-xs">
              Admin credentials required to access the management panel
            </p>
          </div>
        </motion.div>

        {/* Admin demo credentials hidden on UI (hardcoded in logic) */}
      </div>
    </div>
  )
}

export default Login
