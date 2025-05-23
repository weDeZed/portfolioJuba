'use client'

import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-12 sm:py-20">
      <div className="text-center max-w-3xl">
        {/* 🖼 Ta photo en cercle */}
        <motion.p
  className="text-white/80 text-sm sm:text-base mb-4"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
À la recherche d’une <strong className="text-[#BFA181]">alternance en développement</strong>{' '}
  <strong className="text-[#178582]"></strong> à partir de{' '}
  <strong className="text-[#BFA181]">septembre 2025</strong>, avec un rythme de{' '}
  <strong className="text-[#BFA181]">1 semaine en cours / 2 semaines en entreprise</strong>.
</motion.p>

        <motion.div
          className="mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#BFA181] shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/juba.jpg"
            alt="Juba Chabane"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* 👋 Texte principal */}
        <motion.h1
          className="text-3xl sm:text-5xl font-bold mb-6 text-white"
          style={{ color: '#BFA181' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span style={{ color: '#178582' }}>Juba </span>
          <span style={{ color: '#BFA181' }}>Chabane</span>
          
        </motion.h1>

        {/* 📝 Description */}
        <motion.p
          className="text-base sm:text-xl mb-10 text-white/90"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <strong>Code réfléchi, UX claire, résultats concrets. C’est ma promesse.</strong>
        </motion.p>

        {/* 🔘 Boutons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="/projects"
            className="px-6 py-3 rounded-md text-white font-semibold text-sm sm:text-base"
            style={{ backgroundColor: '#178582' }}
          >
            Voir mes projets
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-md border font-semibold text-sm sm:text-base"
            style={{
              borderColor: '#178582',
              color: '#178582',
            }}
          >
            Me contacter
          </a>
        </motion.div>
      </div>
    </section>
  )
}
