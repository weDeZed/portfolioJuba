"use client";

import { useState, useRef, useEffect } from "react";

export default function SatyaPage() {
  const [energy, setEnergy] = useState(0);
  const [modifier, setModifier] = useState(0); // Différence temporaire affichée
  const [showModifier, setShowModifier] = useState(false); // Visibilité du modificateur
  const [isModifierFading, setIsModifierFading] = useState(false); // Animation de fade-out
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastEnergyRef = useRef(0);
  const modifierBaseRef = useRef(0); // Valeur de base du modificateur pour l'accumulation
  const isPressedRef = useRef(false);

  const LONG_PRESS_THRESHOLD = 250; // ms

  // Debounce pour enregistrer la transaction après inactivité
  const scheduleRecordTransaction = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const change = energy - lastEnergyRef.current;
      if (change !== 0) {
        console.log(`${change > 0 ? "+" : ""}${change} Énergies`);
        lastEnergyRef.current = energy;
      }
      
      // Déclencher le fade-out du modificateur après 1.5s
      setIsModifierFading(true);
      setTimeout(() => {
        setShowModifier(false);
        setModifier(0);
        setIsModifierFading(false);
      }, 300); // Durée de la transition CSS
    }, 1500);
  };

  // Gestion du pressage pour increment/decrement
  const handlePointerDown = (increment: boolean) => {
    if (isPressedRef.current) return; // Ignore les appuis multiples

    isPressedRef.current = true;

    // Initialiser le modificateur si c'est un nouvel appui
    if (!showModifier) {
      setShowModifier(true);
      modifierBaseRef.current = energy;
    }

    // Ajouter/retirer 1 immédiatement
    setEnergy((prev) => {
      const newEnergy = increment ? prev + 1 : Math.max(0, prev - 1);
      // Mettre à jour le modificateur (différence depuis la base)
      setModifier(newEnergy - modifierBaseRef.current);
      return newEnergy;
    });

    pressTimerRef.current = setTimeout(() => {
      if (isPressedRef.current) {
        // Long press détecté après 250ms, démarrer l'interval
        intervalRef.current = setInterval(() => {
          setEnergy((prev) => {
            const newEnergy = increment ? prev + 1 : Math.max(0, prev - 1);
            // Mettre à jour le modificateur en continu
            setModifier(newEnergy - modifierBaseRef.current);
            return newEnergy;
          });
        }, 100);
      }
    }, LONG_PRESS_THRESHOLD);
  };

  const handlePointerUp = () => {
    isPressedRef.current = false;

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }

    if (intervalRef.current) {
      // Long press était en cours
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    scheduleRecordTransaction();
  };

  const reset = () => {
    setEnergy(0);
    setModifier(0);
    setShowModifier(false);
    setIsModifierFading(false);
    modifierBaseRef.current = 0;
    lastEnergyRef.current = 0;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    console.log("Compteur réinitialisé");
  };

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
        onPointerDown={() => handlePointerDown(true)}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="flex-1 flex items-center justify-center text-[20vw] font-bold text-black/80 hover:bg-black/10 active:bg-black/20 transition-colors relative z-10"
        aria-label="Ajouter une énergie"
      >
        +
      </button>

      {/* Affichage du compteur au milieu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className="flex flex-col items-center gap-2 relative">
          <span className="text-[25vw] font-bold text-black drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            {energy}
          </span>
          
          {/* Floating Modifier */}
          {showModifier && (
            <span
              className={`absolute -right-[15vw] top-[5vw] text-[8vw] font-bold transition-opacity duration-300 ${
                isModifierFading ? "opacity-0" : "opacity-100"
              } ${modifier > 0 ? "text-green-600" : "text-red-600"} drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
            >
              {modifier > 0 ? "+" : ""}{modifier}
            </span>
          )}
          
          <span className="text-xl text-black/70 tracking-widest uppercase font-bold">
            Énergie
          </span>
        </div>
      </div>

      {/* Bouton - (moitié basse) */}
      <button
        onPointerDown={() => handlePointerDown(false)}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
