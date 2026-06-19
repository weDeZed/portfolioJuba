'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionTitle from '@/app/components/SectionTitle'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactMethods = [
    {
      title: 'Email',
      value: 'juba.chabane.pro@gmail.com',
      href: 'mailto:juba.chabane.pro@gmail.com',
      icon: '✉️',
    },
    {
      title: 'Téléphone',
      value: '+33 6 98 43 01 88',
      href: 'tel:+33698430188',
      icon: '📱',
    },
    {
      title: 'LinkedIn',
      value: 'Juba Chabane',
      href: 'https://linkedin.com',
      icon: '💼',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#178582]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#BFA181]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle subtitle="N'hésitez pas à me contacter pour toute collaboration ou question">
            Entrons en contact
          </SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Methods */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={itemVariants}
                whileHover={{ x: 10, boxShadow: '0 20px 40px rgba(23, 133, 130, 0.2)' }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#178582] transition">
                      {method.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/80 transition">
                      {method.value}
                    </p>
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transition">
                    ↗
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Additional Info */}
            <motion.div variants={itemVariants} className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#178582]/10 to-[#BFA181]/10 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-3">Disponibilité</h4>
              <p className="text-white/70 text-sm">
                Je réponds généralement aux messages dans les 24 heures. N'hésitez pas à m'écrire pour une collaboration ou une simple discussion !
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  ✓
                </motion.div>
                <h4 className="text-xl font-semibold text-[#178582] mb-2">Message envoyé !</h4>
                <p className="text-white/60">Merci pour votre message. Je vous recontacterai très bientôt.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-[#178582] focus:outline-none focus:ring-2 focus:ring-[#178582]/20 transition-all"
                    placeholder="Votre nom"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-[#178582] focus:outline-none focus:ring-2 focus:ring-[#178582]/20 transition-all"
                    placeholder="votre@email.com"
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-[#178582] focus:outline-none focus:ring-2 focus:ring-[#178582]/20 transition-all resize-none"
                    placeholder="Votre message..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#178582] to-[#0d5b58] hover:shadow-lg hover:shadow-[#178582]/50 transition-all border border-[#178582]/50"
                >
                  Envoyer le message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
