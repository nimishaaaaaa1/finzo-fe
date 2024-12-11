export function Footer() {
  return (
    <footer className="bg-[#211A1F] text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
        {/* Finzo Column */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Finzo</h3>
          <p className="text-gray-300">
            Your AI assistant for Indian taxation, budgeting, and investment advice.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <a href="/" className="block text-gray-300 hover:text-white">Home</a>
            <a href="/services" className="block text-gray-300 hover:text-white">Services</a>
            <a href="/about" className="block text-gray-300 hover:text-white">About</a>
            <a href="/contact" className="block text-gray-300 hover:text-white">Contact</a>
          </nav>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-2 mb-6">
            <p className="text-gray-300">Email: work.nimishachanda@gmail.com</p>
            <p className="text-gray-300">Phone: +91 123 456 7890</p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/nimisha-chanda/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://www.instagram.com/zest_lives/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://x.com/NimishaChanda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              @NimishaChanda
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-800">
        <p className="text-center text-gray-400">
          © 2024 Finzo. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 