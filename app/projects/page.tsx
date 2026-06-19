'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/app/components/SectionTitle'
import ProjectsCarousel from '@/app/components/ProjectsCarousel'

export default function ProjectsPage() {
  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#178582]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#BFA181]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionTitle subtitle="Décourez les projets que j'ai développés">Mes projets</SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ProjectsCarousel />
        </motion.div>
      </div>
    </section>
  )
}
