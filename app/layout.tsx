import './globals.css'
import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'


export const metadata = {
  title: 'Portfolio – Juba',
  description: 'Développeur Web Full-Stack',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
    <body className="bg-[#0A1828] text-white">
    <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-6 py-12">{children}</main>
          <Footer />
          </div>
      </body>
    </html>
  )
}
