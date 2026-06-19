'use client'

import { motion } from 'framer-motion'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function Button({ href, children, variant = 'primary' }: Props) {
  const variants = {
    primary: {
      base: 'relative inline-block px-8 py-3 rounded-xl font-semibold text-white overflow-hidden group',
      styles: 'bg-gradient-to-r from-[#178582] to-[#0d5b58] border border-[#178582]/50',
    },
    secondary: {
      base: 'relative inline-block px-8 py-3 rounded-xl font-semibold text-white overflow-hidden group',
      styles: 'bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40',
    },
    outline: {
      base: 'relative inline-block px-8 py-3 rounded-xl font-semibold text-white overflow-hidden group',
      styles: 'bg-transparent border-2 border-[#BFA181]',
    },
  }

  const selectedVariant = variants[variant]

  return (
    <motion.a
      href={href}
      className={`${selectedVariant.base} ${selectedVariant.styles} transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#BFA181] to-[#178582] opacity-0 group-hover:opacity-10 transition-opacity"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 blur-xl"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.a>
  )
}
  