'use client'

import Icon from '@mdi/react'
import { mdiDownload } from '@mdi/js'

export default function CVPage() {
  return (
    <section
      className="min-h-[calc(100vh-120px)] px-6 sm:px-10 py-16"
      style={{ backgroundColor: '#0A1828', color: '#FFFFFF' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Titre */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: '#BFA181' }}>
          Mon CV
        </h2>
        <p className="text-white/80 text-lg sm:text-xl mb-8">
          Téléchargez mon CV ou consultez-le directement ci-dessous.
        </p>

        {/* 🔘 Bouton de téléchargement */}
        <div className="mb-10">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#178582] text-[#178582] font-semibold rounded hover:bg-[#178582]/10 transition"
          >
            <Icon path={mdiDownload} size={1} color="#178582" />
            Télécharger le PDF
          </a>
        </div>

        {/* 🖼 Prévisualisation PDF */}
        <div className="relative bg-[#0F263A] rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="/cv.pdf"
            title="CV de Juba Chabane"
            className="w-full h-[600px] sm:h-[700px]"
          />
        </div>
      </div>
    </section>
  )
}
