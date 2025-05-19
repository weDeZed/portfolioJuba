export default function HomePage() {
    return (
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6"
        style={{ backgroundColor: '#0A1828', color: '#FFFFFF' }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#BFA181' }}>
          Bonjour, je suis <span style={{ color: '#178582' }}>Juba</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl text-white/90">
        Full-stack et full-impact : je conçois, je connecte, j’optimise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/projects"
            className="px-6 py-3 rounded-md text-white font-semibold text-sm sm:text-base"
            style={{ backgroundColor: '#178582' }}
          >
            Voir mes projets
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-md border font-semibold text-sm sm:text-base text-center"
            style={{
              borderColor: '#178582',
              color: '#178582',
            }}
          >
            Me contacter
          </a>
        </div>
      </section>
    )
  }
  