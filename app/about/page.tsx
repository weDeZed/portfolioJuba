'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/app/components/SectionTitle'

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'JWT'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Docker', 'CI/CD'] },
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP'] },
  ]

  const interests = [
    { icon: '🎯', title: 'Développement Web', desc: 'Créer des expériences web modernes' },
    { icon: '🎨', title: 'Design UX/UI', desc: 'Interfaces intuitives et belles' },
    { icon: '💡', title: 'Innovation', desc: 'Implémenter les dernières technologies' },
    { icon: '🚀', title: 'Performance', desc: 'Code optimisé et rapide' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#178582]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#BFA181]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle subtitle="Décourez qui je suis et ce qui me motive">À propos de moi</SectionTitle>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-white/80 leading-relaxed">
              Salut ! Je suis <span className="text-[#BFA181] font-semibold">Juba Chabane</span>, un développeur Full Stack passionné par la création d'expériences web modernes et intuitives.
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              Actuellement à la recherche d'une <span className="text-[#178582] font-semibold">alternance pour 2025-2026</span>, je combine des compétences solides en développement front-end et back-end avec une sensibilité particulière à l'expérience utilisateur.
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              J'ai eu l'opportunité de travailler sur des projets concrets : plateformes web industrielles, applications de suivi, sites e-commerce, et bien d'autres. De la conception UI à l'intégration de l'IA, je suis à l'aise à chaque étape.
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              En dehors du code, je suis passionné par la <span className="text-[#178582]">musculation</span>, le <span className="text-[#BFA181]">football</span>, et le développement personnel. J'aime apprendre chaque jour et repousser mes limites.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#178582] to-[#0d5b58] border border-[#178582]/50 hover:shadow-lg hover:shadow-[#178582]/50 transition-all"
              >
                Voir mes projets
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all"
              >
                Me contacter
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Interests Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {interests.map((interest, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(23, 133, 130, 0.2)' }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all"
              >
                <div className="text-4xl mb-3">{interest.icon}</div>
                <h3 className="font-semibold text-white mb-2">{interest.title}</h3>
                <p className="text-white/60 text-sm">{interest.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Compétences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-[#178582]/50 transition-all"
              >
                <h3 className="font-semibold text-[#178582] mb-4 text-lg">{skillGroup.category}</h3>
                <div className="space-y-3">
                  {skillGroup.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#BFA181]" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
