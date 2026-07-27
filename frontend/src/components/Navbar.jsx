import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaTimes, FaKey, FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vehicles', label: 'Vehicles' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav className="fixed w-full top-0 z-50 glass-effect border-b border-gray-700" aria-label="Primary navigation">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-bold transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[#ff3a52]'
                    : 'text-white hover:text-[#c41e3a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-[#c41e3a] transition font-bold flex items-center gap-2">
                  <FaKey /> Admin Dashboard
                </Link>
                <span className="text-gray-300 font-semibold">Hi, {user?.name?.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary flex items-center gap-2">
                  <FaSignInAlt /> ADMIN LOGIN
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#c41e3a] p-2 -mr-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="md:hidden border-t border-gray-700 overflow-hidden"
            >
              <div className="py-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-3 px-4 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'text-[#ff3a52] font-semibold bg-white/5'
                        : 'text-white hover:text-[#c41e3a] hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-700 mt-4 pt-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block py-3 px-4 text-white hover:text-[#c41e3a] font-bold flex items-center gap-2 rounded-lg hover:bg-white/5"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaKey /> Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="w-full text-left py-3 px-4 text-[#ff3a52] hover:text-[#c41e3a] font-bold rounded-lg hover:bg-white/5"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block py-3 px-4 text-[#c41e3a] font-black text-lg flex items-center gap-2 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaSignInAlt /> ADMIN LOGIN
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
