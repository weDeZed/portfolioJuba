"use client";

import { useEffect, useRef, useState } from "react";

type ManaCounterProps = {
	name: string;
	asset: string;
	background: string;
	textColor: string;
};

const LONG_PRESS_THRESHOLD = 250;

function ManaCounter({ name, asset, background, textColor }: ManaCounterProps) {
	const [mana, setMana] = useState(0);
	const [modifier, setModifier] = useState(0);
	const [showModifier, setShowModifier] = useState(false);
	const [isModifierFading, setIsModifierFading] = useState(false);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const transactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const baseManaRef = useRef(0);
	const isPressedRef = useRef(false);

	const updateMana = (increment: boolean) => {
		setMana((currentMana) => {
			const nextMana = increment ? currentMana + 1 : Math.max(0, currentMana - 1);
			setModifier(nextMana - baseManaRef.current);
			return nextMana;
		});
	};

	const handlePointerDown = (increment: boolean) => {
		if (isPressedRef.current) return;

		isPressedRef.current = true;
		if (!showModifier) {
			setShowModifier(true);
			baseManaRef.current = mana;
		}

		updateMana(increment);
		pressTimerRef.current = setTimeout(() => {
			if (isPressedRef.current) {
				intervalRef.current = setInterval(() => updateMana(increment), 100);
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
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		if (transactionTimerRef.current) clearTimeout(transactionTimerRef.current);
		transactionTimerRef.current = setTimeout(() => {
			setIsModifierFading(true);
			fadeTimerRef.current = setTimeout(() => {
				setShowModifier(false);
				setModifier(0);
				setIsModifierFading(false);
			}, 300);
		}, 1500);
	};

	const reset = () => {
		setMana(0);
		setModifier(0);
		setShowModifier(false);
		setIsModifierFading(false);
		baseManaRef.current = 0;
		if (transactionTimerRef.current) clearTimeout(transactionTimerRef.current);
		if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
	};

	useEffect(() => {
		return () => {
			if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (transactionTimerRef.current) clearTimeout(transactionTimerRef.current);
			if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
		};
	}, []);

	return (
		<section
			className="relative flex min-h-0 select-none flex-col overflow-hidden rounded-3xl shadow-xl"
			style={{ backgroundColor: background, color: textColor }}
		>
			<div
				className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-15"
				style={{
					backgroundImage: `url(${asset})`,
				}}
			/>

			<button
				type="button"
				onPointerDown={() => handlePointerDown(true)}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
				onPointerLeave={handlePointerUp}
				className="relative z-10 flex-1 text-5xl font-bold text-black transition-colors hover:bg-black/10 active:bg-black/20 sm:text-7xl lg:text-9xl"
				aria-label={`Ajouter du mana ${name.toLowerCase()}`}
			>
				+
			</button>

			<div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
				<div className="relative flex flex-col items-center">
					<span className="text-[clamp(3rem,8vw,8rem)] font-bold leading-none drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
						{mana}
					</span>
					<span
						className={`min-h-10 text-4xl font-bold leading-none transition-opacity duration-300 ${
							showModifier && !isModifierFading ? "opacity-100" : "opacity-0"
						} ${modifier > 0 ? "text-green-600" : "text-red-700"}`}
						aria-hidden={!showModifier}
					>
						{showModifier ? `${modifier > 0 ? "+" : ""}${modifier}` : "0"}
					</span>
					<span className="mt-2 text-[0.55rem] font-bold uppercase tracking-[0.12em] opacity-75 sm:text-xs sm:tracking-[0.2em]">
						{name}
					</span>
				</div>
			</div>

			<button
				type="button"
				onPointerDown={() => handlePointerDown(false)}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
				onPointerLeave={handlePointerUp}
				className="relative z-10 flex-1 text-5xl font-bold text-black transition-colors hover:bg-black/10 active:bg-black/20 sm:text-7xl lg:text-9xl"
				aria-label={`Retirer du mana ${name.toLowerCase()}`}
			>
				−
			</button>

			<button
				type="button"
				onClick={reset}
				className="absolute bottom-3 right-3 z-30 rounded-lg bg-black/10 px-3 py-1.5 text-xs font-semibold opacity-70 transition hover:bg-black/20 hover:opacity-100"
				aria-label={`Réinitialiser le mana ${name.toLowerCase()}`}
			>
				Reset
			</button>
		</section>
	);
}

export default function AzulaPage() {
	return (
		<main className="h-dvh overflow-hidden bg-slate-950 px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
			<div className="mx-auto flex h-full min-h-0 max-w-7xl flex-col gap-3 sm:gap-4">
				<header className="flex items-end justify-between gap-4 text-white">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Azula</p>
						<h1 className="mt-1 text-xl font-bold sm:text-3xl">Compteurs de mana</h1>
					</div>
					<p className="hidden text-right text-sm text-slate-400 sm:block">Rouge · Bleu · Noir</p>
				</header>

				<div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
					<ManaCounter name="Mana rouge" asset="/images/redmana.svg" background="#EB9F82" textColor="#000000" />
					<ManaCounter name="Mana bleu" asset="/images/bluemana.svg" background="#B3CEEA" textColor="#000000" />
					<ManaCounter name="Mana noir" asset="/images/blackmana.svg" background="#A69F9D" textColor="#150B00" />
				</div>
			</div>
		</main>
	);
}