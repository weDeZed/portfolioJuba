'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const projects = [
  {
    title: 'Plateforme de voyages écoresponsables',
    description: 'Développement full-stack d’une plateforme de comparaison de voyages durables.',
    details: `Mission réalisée chez Traveleef. 
  Conception et implémentation d’une application web permettant de comparer les offres de voyages selon des critères écologiques.
  Back-end en Python Flask pour gérer les APIs et les traitements de données, et front-end en Angular pour une interface moderne et réactive.`,
    imageUrl: '/images/lion.jpg',
    technologies: ['Python', 'Flask', 'Angular', 'PostgreSQL'],
  },
  {
    title: 'Générateur de rapports PDF sécurisé',
    description: 'Développement d’un module back-end clé en mission freelance.',
    details: `Création d’une fonctionnalité back-end pour une entreprise industrielle : génération automatique de rapports PDF à partir des données temps réel.
Implémentation de JWT pour la gestion des accès sécurisés, intégration API avec authentification et logique conditionnelle.`,
    imageUrl: '/images/lion.jpg',
    technologies: ['Node.js', 'Express', 'JWT', 'MongoDB', 'PDFKit'],
  },
  {
    title: 'Application des gestion de stages',
    description: 'Développement et déploiement d’une application web de gestion des stages.',
    details: `Développée en équipe avec Spring Boot et Angular, eStage centralise le suivi des stages étudiants.
Ajout de fonctionnalités comme l’envoi automatique d’e-mails, la gestion des documents, et un tableau de bord individualisé pour plus de 80 utilisateurs.`,
    imageUrl: '/images/lion.jpg',
    technologies: ['Spring Boot', 'Angular', 'PostgreSQL', 'Agile', 'Java'],
  },
  {
    title: 'Interfaces front pour VIF SOFTWARE',
    description: 'Participation au développement d’applications web industrielles.',
    details: `Ajout de fonctionnalités, amélioration de modules existants, débogage front-end, et refonte de vues en lien avec l’équipe produit.
Intégration d’outils d’analyse IA et conception de modules réactifs adaptés aux besoins métiers.`,
    imageUrl: '/images/lion.jpg',
    technologies: ['Vue.js', 'Vuetify', 'JavaScript', 'REST API'],
  },
  {
    title: 'Optimisation de Grimport et intégration e-commerce',
    description: 'Extension des capacités d’un outil d’import de données et déploiement e-commerce.',
    details: `Amélioration des scripts d'import du Grimport, un outil interne dédié à la récupération et à l'intégration de données produit pour des sites e-commerce.
  Travail de reverse engineering sur des sites e-commerce pour adapter l’outil à de nouveaux formats. 
  Installation et configuration de serveurs Prestashop, optimisation des performances d'import, et automatisation de flux de données.`,
    imageUrl: '/images/lion.jpg',
    technologies: ['Prestashop', 'PHP', 'MySQL', 'Web scraping', 'Shell'],
  }
  
  
]

export default function ProjectsCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000 }))
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [autoplay.current])

  return (
    <div className="overflow-hidden relative h-[100vh]" ref={emblaRef}>
      <div className="flex h-full">
        {projects.map((project, i) => (
          <div className="min-w-full relative flex items-center justify-center h-full" key={i}>
            {/* Image de fond */}
            {/* Image de fond */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                style={{ filter: 'brightness(0.3)' }}
              />

{/* Dégradé fondu en haut et bas */}
<div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0A1828]/10 via-transparent to-[#0A1828]/40" />


            {/* Contenu superposé */}
            <div className="relative z-10 text-center px-6 text-white max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: '#BFA181' }}>
                {project.title}
              </h2>
              <p className="text-lg sm:text-xl mb-2">{project.description}</p>
              <p className="text-sm sm:text-base mb-6 max-w-xl text-white/80 whitespace-pre-line">
                {project.details}
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white text-[#0A1828] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches de navigation */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-between px-4 transform -translate-y-1/2">
        <button
          onClick={() => embla && embla.scrollPrev()}
          className="text-white text-3xl font-bold hover:text-[#178582]"
        >
          ‹
        </button>
        <button
          onClick={() => embla && embla.scrollNext()}
          className="text-white text-3xl font-bold hover:text-[#178582]"
        >
          ›
        </button>
      </div>
    </div>
  )
}
