"use client";

import { useState } from "react";

export default function SatyaPage() {
  const [energy, setEnergy] = useState(0);

  const increment = () => setEnergy((prev) => prev + 1);
  const decrement = () => setEnergy((prev) => Math.max(0, prev - 1));

  const reset = () => setEnergy(0);

  return (
    <div className="fixed inset-0 flex flex-col select-none bg-yellow-400">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/energy-symbol.svg)',
          backgroundSize: '60%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Bouton + (moitié haute) */}
      <button
        onClick={increment}
        className="flex-1 flex items-center justify-center text-[20vw] font-bold text-black/80 hover:bg-black/10 active:bg-black/20 transition-colors relative z-10"
        aria-label="Ajouter une énergie"
      >
        +
      </button>

      {/* Affichage du compteur au milieu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[25vw] font-bold text-black drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            {energy}
          </span>
          <span className="text-xl text-black/70 tracking-widest uppercase font-bold">
            Énergie
          </span>
        </div>
      </div>

      {/* Bouton - (moitié basse) */}
      <button
        onClick={decrement}
        className="flex-1 flex items-center justify-center text-[20vw] font-bold text-black/80 hover:bg-black/10 active:bg-black/20 transition-colors relative z-10"
        aria-label="Retirer une énergie"
      >
        −
      </button>

      {/* Bouton reset discret */}
      <button
        onClick={reset}
        className="absolute bottom-4 right-4 px-4 py-2 text-sm text-black/50 hover:text-black bg-black/10 hover:bg-black/20 rounded-lg transition-colors z-30"
        aria-label="Réinitialiser"
      >
        Reset
      </button>

      {/* Ligne de séparation décorative */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent pointer-events-none z-10" />
    </div>
  );
}
