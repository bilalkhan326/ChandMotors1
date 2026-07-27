import { useEffect, useState } from 'react'
import sportCarImg from '../../images/featured-cars/fc5.png'
import { settingsAPI } from '../services/api'

export const Logo = ({ size = 'md' }) => {
  const [logoSrc, setLogoSrc] = useState(sportCarImg)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsAPI.getSettings()
        const settings = res.data?.settings
        if (settings?.logo) {
          // Use relative /uploads path directly so dev proxy serves it
          const src = typeof settings.logo === 'string'
            ? (settings.logo.startsWith('/') ? settings.logo : `/images/${settings.logo}`)
            : sportCarImg
          setLogoSrc(src)
        }
      } catch (err) {
        // ignore, keep default
      }
    }
    loadSettings()
    // Listen for settings changes (e.g., when admin saves a new logo)
    const onSettingsUpdated = (e) => {
      const logo = e?.detail?.logo
      if (logo) {
        const src = typeof logo === 'string' ? (logo.startsWith('/') ? logo : `/images/${logo}`) : sportCarImg
        setLogoSrc(src)
      }
    }
    window.addEventListener('settings:updated', onSettingsUpdated)
    return () => window.removeEventListener('settings:updated', onSettingsUpdated)
  }, [])
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-14 h-14 sm:w-16 sm:h-16'
  }

  const textSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-4xl',
    xl: 'text-4xl sm:text-6xl'
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* Sports Car Image Logo */}
      <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-black shadow-lg overflow-hidden border border-[#c41e3a]/30`}>
        <img
          src={
            typeof logoSrc === 'string'
              ? (
                  logoSrc.startsWith('data:')
                    ? logoSrc
                    : (logoSrc.startsWith('/') ? encodeURI(logoSrc) : `/images/${logoSrc}`)
                )
              : logoSrc
          }
          alt="Chand Motors G-9 logo"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col min-w-0">
        <div className={`${textSize[size]} font-black text-white tracking-tight leading-none`}>
          CHAND
        </div>
        <div className="text-xs font-black text-[#ff3a52] tracking-widest">
          MOTORS
        </div>
      </div>
    </div>
  )
}

export default Logo
