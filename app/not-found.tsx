// app/not-found.tsx
export default function NotFound() {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#0A1828] text-white px-4">
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#BFA181' }}>
          404
        </h1>
        <p className="text-xl mb-6">Oups ! Cette page n'existe pas.</p>
        <a href="/" className="px-6 py-3 rounded-md font-semibold" style={{ backgroundColor: '#178582', color: '#FFFFFF' }}>
          Retour à l'accueil
        </a>
      </section>
    )
  }
  