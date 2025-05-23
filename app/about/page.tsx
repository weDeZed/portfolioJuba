export default function AboutPage() {
  return (
    <section
      className="min-h-[calc(100vh-120px)] px-6 sm:px-10 py-16 max-w-3xl mx-auto"
      style={{ backgroundColor: '#0A1828', color: '#FFFFFF' }}
    >
      {/* Titre principal */}
      <h1 className="text-5xl sm:text-6xl font-bold mb-10" style={{ color: '#BFA181' }}>
        OH, SALUT.
      </h1>

      {/* Paragraphes justifiés */}
      <p className="text-base sm:text-lg mb-6 leading-relaxed text-white/90 text-justify">
        Je suis <strong>Juba Chabane</strong>, développeur full-stack, actuellement à la recherche
        d’une alternance pour la rentrée 2025–2026. Curieux, autonome et passionné, je combine des compétences
        solides en front-end et back-end avec une réelle sensibilité à l’expérience utilisateur.
      </p>

      <p className="text-base sm:text-lg mb-6 leading-relaxed text-white/90 text-justify">
        J’ai eu l’occasion de travailler sur des projets concrets : plateformes web industrielles,
        applications de suivi des stages, sites e-commerce écoresponsables, et bien plus. De la
        conception UI à l’intégration de l’IA, je suis à l’aise à chaque étape du développement.
      </p>

      <p className="text-base sm:text-lg mb-6 leading-relaxed text-white/90 text-justify">
        Côté techno ? Je manie aussi bien <strong>JavaScript, Java, PHP, Python</strong> que{' '}
        <strong>React, Angular, Symfony, Spring Boot</strong>, et je suis à l’aise avec les bases de
        données comme <strong>MongoDB, PostgreSQL</strong> ou encore les CMS comme{' '}
        <strong>WordPress</strong> et <strong>Prestashop</strong>.
      </p>

      <p className="text-base sm:text-lg mb-10 leading-relaxed text-white/90 text-justify">
        Je suis aussi passionné par la musculation, le foot et le développement personnel. Ce qui
        m’anime ? Apprendre chaque jour, repousser mes limites et construire des interfaces qui ont
        du sens.
      </p>

      {/* Boutons de navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-start">
        <a
          href="/projects"
          className="px-6 py-3 border border-[#BFA181] text-[#BFA181] font-semibold rounded hover:bg-[#BFA181]/10 transition"
        >
          VOIR MES PROJETS
        </a>
        <a
          href="/contact"
          className="px-6 py-3 border border-[#178582] text-[#178582] font-semibold rounded hover:bg-[#178582]/10 transition"
        >
          ME CONTACTER
        </a>
        <a
          href="/cv"
          className="px-6 py-3 border border-white text-white font-semibold rounded hover:bg-white/10 transition"
        >
          MON CV
        </a>
      </div>
    </section>
  )
}
