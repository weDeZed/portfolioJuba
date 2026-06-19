'use client'

import { motion } from 'framer-motion'

type Props = {
  title: string
  description: string
  imageUrl: string
  link: string
}

export default function ProjectCard({ title, description, imageUrl, link }: Props) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(23, 133, 130, 0.2)' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#178582]/20 to-[#BFA181]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Image container */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
        />

        {/* Overlay gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0A1828] via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Icon/Link indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="text-white text-4xl"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            ↗
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 relative z-10">
        <motion.h3
          className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-[#178582] to-[#BFA181] bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-white/70 text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>

        {/* Animated border bottom on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#178582] to-[#BFA181]"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.a>
  )
}
  