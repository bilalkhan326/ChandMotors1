import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import formatPrice from '../utils/formatPrice'

const CarCard = ({ car }) => {
  // Backend base is provided by VITE_API_BASE_URL (which points to /api).
  // For uploaded files we prefer using relative `/uploads/...` so the dev proxy handles requests.
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-hover group"
    >
      <div className="glass-effect rounded-lg overflow-hidden">
        {/* Image */}
        {car.image && (
          <div className="w-full h-56 md:h-64 overflow-hidden bg-black/40">
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
              className="w-full h-full object-cover brightness-105 contrast-110"
                loading="lazy"
                decoding="async"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Name & Price */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{car.name}</h3>
            <p className="text-3xl font-black gradient-text">{formatPrice(car.price)}</p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/60 rounded p-3">
              <p className="text-gray-300 text-xs uppercase tracking-wider mb-1 font-bold">Engine</p>
              <p className="text-white font-black text-lg">{car.engineCC || '2.0L'}</p>
            </div>
            <div className="bg-black/60 rounded p-3 sm:col-span-2">
              <p className="text-gray-300 text-xs uppercase tracking-wider mb-1 font-bold">Capacity</p>
              <p className="text-white font-black text-lg">{car.capacity || '5'} Seats</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-sm text-gray-300 uppercase tracking-wider font-black">Key Features</p>
            <div className="space-y-1">
              {car.features && car.features.length > 0 ? (
                car.features.slice(0, 4).map((feature, idx) => (
                  <p key={idx} className="text-sm text-gray-300 flex items-center font-semibold">
                    <span className="text-[#c41e3a] mr-2">✓</span>
                    {feature}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-sm text-gray-300 flex items-center font-semibold">
                    <span className="text-[#c41e3a] mr-2">✓</span>
                    Premium Features
                  </p>
                  <p className="text-sm text-gray-300 flex items-center font-semibold">
                    <span className="text-[#c41e3a] mr-2">✓</span>
                    Advanced Technology
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Button */}
          <Link
            to={`/vehicle/${car._id}`}
            className="block btn-primary text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default CarCard
