export default function Navbar() {
    return (
      <header style={{ backgroundColor: '#0A1828' }} className="w-full shadow-md sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 text-white">
          <a href="/" className="text-2xl font-extrabold" style={{ color: '#BFA181' }}>
            Acceuil
          </a>
          <div className="flex gap-6 text-sm sm:text-base">
            <a href="/about" className="hover:text-[#178582] transition-colors">À propos</a>
            <a href="/projects" className="hover:text-[#178582] transition-colors">Projets</a>
            <a href="/contact" className="hover:text-[#178582] transition-colors">Contact</a>
            <a href="/cv" className="hover:text-[#178582] transition-colors">CV</a>
          </div>
        </nav>
      </header>
    )
  }
  