'use client'

import { motion } from 'framer-motion'
import { Dock, DockIcon } from '@/components/ui/dock'
import Link from 'next/link'

export default function FloatingDock() {
  const items = [
    {
      icon: '🏠',
      label: 'Accueil',
      href: '/',
      color: 'bg-blue-500',
    },
    {
      icon: '👤',
      label: 'À propos',
      href: '/about',
      color: 'bg-purple-500',
    },
    {
      icon: '💼',
      label: 'Projets',
      href: '/projects',
      color: 'bg-pink-500',
    },
    {
      icon: '📧',
      label: 'Contact',
      href: '/contact',
      color: 'bg-green-500',
    },
    {
      icon: '📄',
      label: 'CV',
      href: '/cv',
      color: 'bg-yellow-500',
    },
    {
      icon: '🔗',
      label: 'GitHub',
      href: 'https://github.com/jubachabane',
      target: '_blank',
      color: 'bg-gray-500',
    },
    {
      icon: '💻',
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      target: '_blank',
      color: 'bg-blue-600',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <Dock className="bg-white/10 border border-white/20 backdrop-blur-xl gap-1 px-3 py-3">
        {items.map((item, idx) => (
          <DockIcon key={idx} className="rounded-full">
            <Link
              href={item.href}
              target={item.target}
              rel={item.target ? 'noopener noreferrer' : undefined}
              className="group relative w-full h-full flex items-center justify-center"
              title={item.label}
            >
              <motion.div
                className={`text-2xl transition-all group-hover:scale-110`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg bg-white/90 text-black text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: -5 }}
              >
                {item.label}
              </motion.div>
            </Link>
          </DockIcon>
        ))}
      </Dock>
    </motion.div>
  )
}
