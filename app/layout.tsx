import './globals.css';

export const metadata = {
  title: 'Portfolio – Juba',
  description: 'Développeur Web Full-Stack',
};

export default function RootLayout() {
  return (
    <html lang="fr">
      <body className="bg-[#0A1828] text-white flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img
            src="/images/juba.jpg"
            alt="Juba"
            className="rounded-full w-40 h-40 object-cover border-4 border-[#178582] mb-8 shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#BFA181] text-center">Site en travaux</h1>
          <p className="text-lg md:text-xl text-center max-w-xl mb-6 text-[#BFA181]">
            Merci de votre visite !<br />
            J'ai mon alternance, par conséquent le site est désactivé et sera bientôt mis à jour.<br />
            Revenez plus tard pour découvrir la nouvelle version.
          </p>
        </div>
      </body>
    </html>
  );
}
