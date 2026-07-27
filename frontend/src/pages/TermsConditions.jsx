import SEO from '../components/SEO'

const TermsConditions = () => {
  return (
    <main className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for using the Chand Motors G-9 website and services."
        keywords={['Chand Motors G-9', 'terms and conditions', 'website terms', 'service terms']}
      />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="glass-effect rounded-lg p-6 sm:p-8 space-y-6">
          <h1 className="section-title mb-0">Terms & Conditions</h1>
          <p className="text-gray-300 leading-relaxed">
            By using this website, you agree to provide accurate information and use the website responsibly.
          </p>
          <h2 className="text-2xl font-bold text-white">Service Requests</h2>
          <p className="text-gray-300 leading-relaxed">
            Service and booking requests are subject to confirmation and availability.
          </p>
          <h2 className="text-2xl font-bold text-white">Vehicle Information</h2>
          <p className="text-gray-300 leading-relaxed">
            Vehicle details, pricing, and availability are provided for reference and may change without notice.
          </p>
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            For questions, contact info@chandmotors.pk.
          </p>
        </article>
      </section>
    </main>
  )
}

export default TermsConditions
