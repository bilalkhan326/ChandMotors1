import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaKey, FaSignInAlt, FaTimes } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vehicles', label: 'Vehicles' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActiveLink = (path) => {
    if (path === '/vehicles' && location.pathname.startsWith('/vehicle')) {
      return true
    }
    return location.pathname === path
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      return
    }

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMenuOpen])

  const handleNavClick = (path) => {
    setIsMenuOpen(false)

    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    navigate(path)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/65 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-[9999] border-b transition-all duration-300 ${
          isScrolled
            ? 'border-white/10 bg-[#050505]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <Logo size="sm" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                  isActiveLink(link.path)
                    ? 'text-[#ff3a52]'
                    : 'text-white/85 hover:text-[#ff3a52]'
                }`}
              >
                <span className="relative pb-1">
                  {link.label}
                  {isActiveLink(link.path) && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#ff3a52]" />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-white/80 transition hover:text-[#ff3a52]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#ff3a52]/40 hover:bg-[#ff3a52]/15"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[#ff3a52]/35 bg-[#ff3a52]/10 px-4 py-2.5 text-sm font-semibold text-[#ff3a52] transition hover:-translate-y-0.5 hover:bg-[#ff3a52]/20"
              >
                <FaSignInAlt /> Admin Login
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-[#ff3a52] transition hover:bg-white/10 md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            id="mobile-navigation"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-0 z-[10000] flex h-screen w-[280px] flex-col bg-[#111111] shadow-[12px_0_40px_rgba(0,0,0,0.45)] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Link to="/" onClick={closeMenu} className="flex items-center">
                <Logo size="sm" />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-full border border-white/10 p-2 text-white/80 transition hover:text-[#ff3a52]"
                aria-label="Close navigation menu"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => handleNavClick(link.path)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] transition ${
                      isActiveLink(link.path)
                        ? 'bg-[#ff3a52]/15 text-[#ff3a52]'
                        : 'text-white/85 hover:bg-white/5 hover:text-[#ff3a52]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-white/35">→</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-[#ff3a52]"
                    >
                      <FaKey /> Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        closeMenu()
                      }}
                      className="flex w-full items-center justify-start gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[#ff3a52] transition hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#ff3a52]/30 bg-[#ff3a52]/10 px-4 py-3 text-sm font-semibold text-[#ff3a52] transition hover:bg-[#ff3a52]/20"
                  >
                    <FaSignInAlt /> Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
