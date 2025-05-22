'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const projects = [
  {
    title: 'Traveleef - Plateforme de voyages écoresponsables',
    images: ['/images/traveleef.png', '/images/traveleef2.png', '/images/traveleef3.png'],
    technologies: ['Python', 'Flask', 'Angular', 'PostgreSQL'],
    description: ` Conception et implémentation d’une application web permettant de comparer les offres de voyages selon des critères écologiques.
  Back-end en Python Flask pour gérer les APIs et les traitements de données, et front-end en Angular pour une interface moderne et réactive.`,
  },
  {
    title: 'Application des gestion des stages',
    images: ['/images/eStage1.png', '/images/eStage2.png', '/images/eStage3.png'],
    technologies: ['Spring Boot', 'Angular', 'PostgreSQL', 'Agile', 'Java'],
    description: `Développée en équipe avec Spring Boot et Angular, l'application eStage centralise le suivi des stages étudiants.
Ajout de fonctionnalités comme l’envoi automatique d’e-mails, la gestion des documents, et un tableau de bord individualisé pour plus de 80 utilisateurs.`,
  },
  {
    title: 'Interfaces front pour VIF SOFTWARE',
    images: ['/images/vif.png', '/images/vif.png', '/images/vif.png'],
    technologies: ['Vue.js', 'Vuetify', 'JavaScript', 'REST API'],
    description: `Ajout de fonctionnalités, amélioration de modules existants, débogage front-end, et refonte de vues en lien avec l’équipe produit.
Intégration d’outils d’analyse IA et conception de modules réactifs adaptés aux besoins métiers.`,
  },
  {
    title: 'Optimisation de Grimport et intégration e-commerce',
    images: ['/images/grimport1.png', '/images/grimport2.png', '/images/grimport3.png'],
    technologies: ['Prestashop', 'PHP', 'MySQL', 'Web scraping', 'Shell'],
    description: `Amélioration des scripts d'import du Grimport, un outil interne dédié à la récupération et à l'intégration de données produit pour des sites e-commerce.
  Travail de reverse engineering sur des sites e-commerce pour adapter l’outil à de nouveaux formats. 
  Installation et configuration de serveurs Prestashop, optimisation des performances d'import, et automatisation de flux de données.`,
  },
]

export default function ProjectsCarousel() {
  const autoplay = useRef(Autoplay({ delay: 8000 }))
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [autoplay.current])

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {projects.map((project, index) => (
          <div className="min-w-full px-6 py-12" key={index}>
            {/* Titre */}
            <h2 className="text-3xl sm:text-4xl font-bold text-[#BFA181] mb-6 text-center">
              {project.title}
            </h2>

            {/* Images */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className="flex-1 overflow-hidden rounded-lg shadow-lg max-w-sm mx-auto"
                >
              <img
                src={src}
                alt={`Aperçu ${i + 1} - ${project.title}`}
                className="w-full h-48 object-contain bg-white rounded-md p-1"
              />
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-white text-[#0A1828] px-3 py-1 rounded-full text-sm font-medium shadow"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-center text-white/90 text-base sm:text-lg whitespace-pre-line">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Flèches de navigation */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-between px-4 transform -translate-y-1/2">
        <button
          onClick={() => embla && embla.scrollPrev()}
          className="text-white text-3xl font-bold hover:text-[#178582] transition"
          aria-label="Projet précédent"
        >
          ‹
        </button>
        <button
          onClick={() => embla && embla.scrollNext()}
          className="text-white text-3xl font-bold hover:text-[#178582] transition"
          aria-label="Projet suivant"
        >
          ›
        </button>
      </div>
    </div>
  )
}
