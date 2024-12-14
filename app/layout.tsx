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
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K8N5VS88');
          `
        }} />
        {/* End Google Tag Manager */}
        {/* Umami Analytics */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3aaa8be8-f1d8-4e70-ba96-3dfb1012c616"></script>
      </head>
      <body className={`${inter.className} bg-[#F2F2F2] text-[#211A1F]`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8N5VS88"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  )
}

