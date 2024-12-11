import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      title: "Taxation Advice",
      description: "Expert guidance on Indian tax laws",
      features: [
        "Income tax planning and filing assistance",
        "GST compliance and strategy",
        "Tax-saving investment recommendations",
        "Handling tax notices and disputes"
      ]
    },
    {
      title: "Budgeting Tips",
      description: "Personalized financial management advice",
      features: [
        "Creating personalized budget plans",
        "Expense tracking and analysis",
        "Debt management strategies",
        "Savings goals and planning"
      ]
    },
    {
      title: "Investment Strategies",
      description: "Tailored investment advice for your goals",
      features: [
        "Portfolio diversification recommendations",
        "Risk assessment and management",
        "Retirement planning",
        "Market trends and opportunities analysis"
      ]
    },
    {
      title: "Financial Education",
      description: "Empowering you with financial knowledge",
      features: [
        "Basic to advanced financial concepts explained",
        "Regular webinars and workshops",
        "Personalized learning paths",
        "Access to a vast library of financial resources"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive financial solutions tailored to your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chat with Finzo CTA */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-purple-100 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get personalized financial guidance instantly with Finzo
          </p>
          <Link 
            href="/#chat-section"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Chat with Finzo
          </Link>
        </div>
      </div>
    </main>
  )
}

