// components/Header.tsx
export default function Header() {
    return (
      <header className="sticky top-0 bg-white/80 backdrop-blur shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-indigo-600">JubaChabane</a>
          <ul className="flex gap-6 text-sm font-medium text-gray-700">
            <li><a href="/about" className="hover:text-indigo-500">À propos</a></li>
            <li><a href="/projects" className="hover:text-indigo-500">Projets</a></li>
            <li><a href="/contact" className="hover:text-indigo-500">Contact</a></li>
          </ul>
        </nav>
      </header>
    )
  }
  