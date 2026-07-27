import { motion } from 'framer-motion'

const FAQModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-lg p-6 max-w-3xl w-full text-white"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Excise & Ownership — FAQ</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <div className="space-y-4 text-sm text-gray-200">
          <div>
            <h3 className="font-semibold text-white">What is excise clearance?</h3>
            <p>Excise clearance is the official certificate confirming that any required excise duties and taxes are paid and the vehicle is legally cleared for registration.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">What documents are needed for ownership transfer?</h3>
            <p>Commonly required documents: original registration (RC), valid ID of buyer/seller, sale deed, NOC (if applicable), transfer forms, and proof of payment of applicable taxes/fees.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">How long does the process take?</h3>
            <p>Typical processing time is 3–14 business days depending on authorities and completeness of documents. We liaise with authorities to speed things up where possible.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Do you handle payments to authorities?</h3>
            <p>Yes — we assist with excise tax calculation and payment submission, and provide receipts and confirmation once processed.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">How can I start?</h3>
            <p>Provide scanned copies of the required documents via email or visit our office. We will prepare the paperwork and guide you through the next steps.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FAQModal
