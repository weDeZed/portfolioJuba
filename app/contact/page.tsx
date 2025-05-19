'use client'

import Icon from '@mdi/react'
import {
  mdiEmailOutline,
  mdiPhoneOutline,
  mdiLinkedin,
  mdiFileDocumentOutline,
} from '@mdi/js'

export default function ContactPage() {
  return (
    <section
      className="min-h-[calc(100vh-120px)] px-6 sm:px-10 py-20"
      style={{ backgroundColor: '#0A1828', color: '#FFFFFF' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#BFA181' }}>
          Restons en contact
        </h2>
        <p className="text-white/80 text-lg sm:text-xl mb-12">
          Une idée, une collaboration, une mission ? Je suis toujours ouvert aux échanges.
        </p>

        {/* Bloc de contact visuel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          {/* Email */}
          <div className="flex items-start gap-5 bg-[#0F263A] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Icon path={mdiEmailOutline} size={1.8} color="#178582" />
            <div>
              <h3 className="text-lg font-bold mb-1 text-white">Email</h3>
              <a
                href="mailto:juba.chabane.pro@gmail.com"
                className="text-white/80 hover:text-[#178582] transition"
              >
                juba.chabane.pro@gmail.com
              </a>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-start gap-5 bg-[#0F263A] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Icon path={mdiPhoneOutline} size={1.8} color="#178582" />
            <div>
              <h3 className="text-lg font-bold mb-1 text-white">Téléphone</h3>
              <a
                href="tel:+33698430188"
                className="text-white/80 hover:text-[#178582] transition"
              >
                +33 6 98 43 01 88
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-start gap-5 bg-[#0F263A] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Icon path={mdiLinkedin} size={1.8} color="#178582" />
            <div>
              <h3 className="text-lg font-bold mb-1 text-white">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/juba-chabane-/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#178582] transition"
              >
                linkedin.com/in/juba-chabane
              </a>
            </div>
          </div>

          {/* CV */}
          <div className="flex items-start gap-5 bg-[#0F263A] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Icon path={mdiFileDocumentOutline} size={1.8} color="#178582" />
            <div>
              <h3 className="text-lg font-bold mb-1 text-white">Mon CV</h3>
              <a
                href="/cv.pdf"
                download
                className="text-white/80 hover:text-[#178582] transition"
              >
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
