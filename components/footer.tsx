import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#211A1F] text-[#FFE7E6] p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Finzo</h3>
          <p>Your AI assistant for Indian taxation, budgeting, and investment advice.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p>Email: info@finzo.ai</p>
          <p>Phone: +91 123 456 7890</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 Finzo. All rights reserved.</p>
      </div>
    </footer>
  )
}

