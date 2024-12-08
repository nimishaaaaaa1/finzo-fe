import { Header } from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Finzo - Your AI Financial Assistant',
  description: 'Get expert advice on Indian taxation, budgeting, and investments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F2F2F2] text-[#211A1F]`}> {/* Updated background color */}
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

