'use client'

import { motion } from 'framer-motion'

export default function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#178582] via-[#BFA181] to-[#178582] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-white/60 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-[#178582] to-[#BFA181] mx-auto mt-6 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
    </motion.div>
  )
}
  