import SEO from '../components/SEO'

const PrivacyPolicy = () => {
  return (
    <main className="w-full min-h-screen py-20 pt-28 sm:pt-32">
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Chand Motors G-9 customer data, inquiries, and website usage."
        keywords={['Chand Motors G-9', 'privacy policy', 'customer data', 'website policy']}
      />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="glass-effect rounded-lg p-6 sm:p-8 space-y-6">
          <h1 className="section-title mb-0">Privacy Policy</h1>
          <p className="text-gray-300 leading-relaxed">
            Chand Motors G-9 respects your privacy and uses your information only to respond to inquiries, manage bookings, and improve our services.
          </p>
          <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed">
            We may collect contact details, booking information, and messages submitted through our forms.
          </p>
          <h2 className="text-2xl font-bold text-white">How We Use It</h2>
          <p className="text-gray-300 leading-relaxed">
            Information is used to provide support, respond to requests, and operate the website.
          </p>
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            For privacy questions, contact info@chandmotors.pk.
          </p>
        </article>
      </section>
    </main>
  )
}

export default PrivacyPolicy
