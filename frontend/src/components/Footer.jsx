import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black border-t border-gray-700 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-black gradient-text">Chand Motors G-9</h3>
            <p className="text-gray-300 text-base font-semibold">
              Your trusted automotive partner in G-9 Islamabad since 2004. Premium vehicles and exceptional service.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-black mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-base font-semibold">
              <li><a href="/#vehicles" className="hover:text-[#c41e3a] transition">Vehicles</a></li>
              <li><a href="/#services" className="hover:text-[#c41e3a] transition">Services</a></li>
              <li><a href="/#about" className="hover:text-[#c41e3a] transition">About Us</a></li>
              <li><a href="/#contact" className="hover:text-[#c41e3a] transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-black mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-gray-300 text-base font-semibold">
              <li><span className="text-gray-300">Maintenance</span></li>
              <li><span className="text-gray-300">Diagnostics</span></li>
              <li><span className="text-gray-300">Repairs</span></li>
              <li><span className="text-gray-300">Custom Tuning</span></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-xl font-black mb-4 text-white">Contact</h4>
            <a href="tel:+923005599479" className="flex items-center gap-2 text-gray-300 text-base font-semibold hover:text-[#c41e3a] transition cursor-pointer">
              <FaPhone /> 03005599479
            </a>
            <a href="mailto:info@chandmotors.pk" className="flex items-center gap-2 text-gray-300 text-base font-semibold hover:text-[#c41e3a] transition cursor-pointer">
              <FaEnvelope /> info@chandmotors.pk
            </a>
            <a href="https://www.google.com/maps/place/Chand+Motors+%26+Real+Estate/@33.6903169,73.0307376,17z/data=!4m14!1m7!3m6!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!2sChand+Motors+%26+Real+Estate!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh!3m5!1s0x38dfbf791e271ac9:0xbae56a2e4ca63ed9!8m2!3d33.6903125!4d73.0333125!16s%2Fg%2F11jvp60rkh?entry=ttu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 text-base font-semibold hover:text-[#c41e3a] transition cursor-pointer">
              <FaMapMarkerAlt /> G-9, Islamabad, Pakistan
            </a>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-300 text-base font-semibold">
              © {currentYear} Chand Motors G-9. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-[#c41e3a] transition text-2xl">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-[#c41e3a] transition text-2xl">
                <FaInstagram />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-300 hover:text-[#c41e3a] transition text-2xl">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-[#c41e3a] transition text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-4 text-gray-300 text-xs">
            <a href="/privacy-policy" className="hover:text-[#c41e3a] transition">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-and-conditions" className="hover:text-[#c41e3a] transition">Terms & Conditions</a>
            <span>|</span>
            <a href="/sitemap.xml" className="hover:text-[#c41e3a] transition">Sitemap</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
