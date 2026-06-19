'use client'

import { motion } from 'framer-motion'

export default function HeroFuturistic() {
  // Floating animation
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
      },
    },
  }

  // Glow animation
  const glowVariants = {
    initial: { boxShadow: '0 0 20px rgba(23, 133, 130, 0.3)' },
    animate: {
      boxShadow: [
        '0 0 20px rgba(23, 133, 130, 0.3)',
        '0 0 40px rgba(191, 161, 129, 0.5)',
        '0 0 20px rgba(23, 133, 130, 0.3)',
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  }

  // Text gradient animation
  const gradientVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 5,
        repeat: Infinity,
      },
    },
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#178582]/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#BFA181]/20 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="max-w-4xl w-full text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
            whileHover={{ borderColor: 'rgba(191, 161, 129, 0.5)', backgroundColor: 'rgba(191, 161, 129, 0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-white/80">
              À la recherche d'une <span className="text-[#BFA181] font-semibold">alternance</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Je suis </span>
            <motion.span
              className="bg-gradient-to-r from-[#178582] via-[#BFA181] to-[#178582] bg-clip-text text-transparent bg-300% font-black"
              variants={gradientVariants}
              initial="initial"
              animate="animate"
              style={{ backgroundSize: '300%' }}
            >
              Juba Chabane
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-lg sm:text-2xl text-white/70 mb-4 leading-relaxed">
            Développeur <span className="text-[#178582]">Full Stack</span> passionné par la création d'expériences web modernes et futuristes
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-white/80 text-base sm:text-lg">
              <span className="font-semibold text-[#BFA181]">Alternance dès septembre 2025</span>
              <br />
              Rythme: <span className="text-[#178582]">1 semaine en cours</span> / <span className="text-[#BFA181]">2 semaines en entreprise</span>
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#178582] to-[#0d5b58] hover:shadow-lg hover:shadow-[#178582]/50 transition-all duration-300 border border-[#178582]/50"
          >
            Voir mes projets →
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
          >
            Me contacter
          </motion.a>
        </motion.div>

        {/* Profile image */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-gradient-to-r from-[#178582] to-[#BFA181]"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-br from-[#178582]/20 to-[#BFA181]/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            >
              <img
                src="/images/juba.jpg"
                alt="Juba Chabane"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-white/50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
