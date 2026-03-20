"use client";

import React, { useEffect, useRef, useState } from "react";

type MtgSet = {
	id: string;
	name: string;
	set_type: string;
	icon_svg_uri?: string;
};

type MtgColor = {
	id: string;
	name: string;
	hex: string;
	textHex: string;
};

const allowedTypes = new Set([
	"core",
	"expansion",
	"masters",
	"draft_innovation",
]);

const mtgColors: MtgColor[] = [
	{
		id: "W",
		name: "Blanc",
		hex: "#f9fafb",
		textHex: "#111827",
	},
	{
		id: "U",
		name: "Bleu",
		hex: "#60a5fa",
		textHex: "#0b1120",
	},
	{
		id: "B",
		name: "Noir",
		hex: "#020617",
		textHex: "#e5e7eb",
	},
	{
		id: "R",
		name: "Rouge",
		hex: "#f97373",
		textHex: "#111827",
	},
	{
		id: "G",
		name: "Vert",
		hex: "#22c55e",
		textHex: "#022c22",
	},
];

const CANVAS_SIZE = 480;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const PnlEtLaRouePage = () => {
	const [sets, setSets] = useState<MtgSet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [rotation, setRotation] = useState<number>(0); // radians
	const [selectedSet, setSelectedSet] = useState<MtgSet | null>(null);

	const [colorRotation, setColorRotation] = useState<number>(0);
	const [isColorSpinning, setIsColorSpinning] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<MtgColor | null>(null);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const colorCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const setWheelAnimationRef = useRef<number | null>(null);
	const colorWheelAnimationRef = useRef<number | null>(null);

	useEffect(() => {
		const fetchSets = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch("https://api.scryfall.com/sets");
				if (!res.ok) {
					throw new Error("Impossible de récupérer les sets depuis Scryfall.");
				}

				const json = await res.json();
				const filtered: MtgSet[] = (json.data || []).filter((s: MtgSet) =>
					allowedTypes.has(s.set_type)
				);

				if (!filtered.length) {
					throw new Error("Aucun set valide trouvé dans la réponse de l'API.");
				}

				setSets(filtered);
			} catch (e: unknown) {
				const message =
					e instanceof Error
						? e.message
						: "Erreur inconnue lors du chargement des sets.";
				setError(message);
			} finally {
				setLoading(false);
			}
		};

		fetchSets();

		return () => {
			if (setWheelAnimationRef.current !== null) {
				cancelAnimationFrame(setWheelAnimationRef.current);
			}
			if (colorWheelAnimationRef.current !== null) {
				cancelAnimationFrame(colorWheelAnimationRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || !sets.length) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const size = CANVAS_SIZE;
		const radius = size / 2 - 20;

		canvas.width = size;
		canvas.height = size;

		ctx.clearRect(0, 0, size, size);

		const centerX = size / 2;
		const centerY = size / 2;

		ctx.save();
		ctx.translate(centerX, centerY);

		const sliceAngle = (2 * Math.PI) / sets.length;

		sets.forEach((set, index) => {
			const startAngle = rotation + index * sliceAngle;
			const endAngle = startAngle + sliceAngle;

			const hue = (index / sets.length) * 360;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fillStyle = `hsl(${hue}, 70%, 55%)`;
			ctx.fill();

			ctx.strokeStyle = "#111827";
			ctx.lineWidth = 1;
			ctx.stroke();

			const midAngle = startAngle + sliceAngle / 2;
			const textRadius = radius * 0.65;
			const x = Math.cos(midAngle) * textRadius;
			const y = Math.sin(midAngle) * textRadius;

			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(midAngle);
			ctx.fillStyle = "#0f172a";
			ctx.font = "12px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const label = set.name.length > 24 ? set.name.slice(0, 21) + "…" : set.name;
			ctx.fillText(label, 0, 0);
			ctx.restore();
		});

		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.25, 0, 2 * Math.PI);
		ctx.fillStyle = "#0f172a";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.22, 0, 2 * Math.PI);
		ctx.fillStyle = "#e5e7eb";
		ctx.fill();

		ctx.fillStyle = "#111827";
		ctx.font = "bold 16px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("MTG", 0, -6);
		ctx.font = "12px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.fillText("Roue", 0, 10);

		ctx.beginPath();
		ctx.moveTo(radius + 10, 0);
		ctx.lineTo(radius - 22, -14);
		ctx.lineTo(radius - 22, 14);
		ctx.closePath();
		ctx.fillStyle = "#ef4444";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#b91c1c";
		ctx.stroke();

		ctx.restore();
	}, [sets, rotation]);

	const handleSpin = () => {
		if (!sets.length || isSpinning) return;

		const sliceAngle = (2 * Math.PI) / sets.length;
		const targetIndex = Math.floor(Math.random() * sets.length);
		const turns = 4 + Math.floor(Math.random() * 3);

		const startRotation = rotation % (2 * Math.PI);
		const A =
			(startRotation + targetIndex * sliceAngle + sliceAngle / 2) %
			(2 * Math.PI);
		const delta = 2 * Math.PI * turns - A;
		const finalRotation = startRotation + delta;

		if (setWheelAnimationRef.current !== null) {
			cancelAnimationFrame(setWheelAnimationRef.current);
		}

		const duration = 5000;
		const startTime = performance.now();

		setIsSpinning(true);
		setSelectedSet(null);

		const animate = (time: number) => {
			const elapsed = time - startTime;
			const t = Math.min(1, elapsed / duration);
			const eased = easeOutCubic(t);
			const current = startRotation + (finalRotation - startRotation) * eased;
			setRotation(current);

			if (t < 1) {
				setWheelAnimationRef.current = requestAnimationFrame(animate);
			} else {
				setIsSpinning(false);
				setRotation(finalRotation % (2 * Math.PI));
				setSelectedSet(sets[targetIndex]);
			}
		};

		setWheelAnimationRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		const canvas = colorCanvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const size = CANVAS_SIZE;
		const radius = size / 2 - 20;

		canvas.width = size;
		canvas.height = size;

		ctx.clearRect(0, 0, size, size);

		const centerX = size / 2;
		const centerY = size / 2;

		ctx.save();
		ctx.translate(centerX, centerY);

		const sliceAngle = (2 * Math.PI) / mtgColors.length;

		mtgColors.forEach((color, index) => {
			const startAngle = colorRotation + index * sliceAngle;
			const endAngle = startAngle + sliceAngle;

			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fillStyle = color.hex;
			ctx.fill();

			ctx.strokeStyle = "#020617";
			ctx.lineWidth = 1.5;
			ctx.stroke();

			const midAngle = startAngle + sliceAngle / 2;
			const textRadius = radius * 0.6;
			const x = Math.cos(midAngle) * textRadius;
			const y = Math.sin(midAngle) * textRadius;

			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(midAngle);
			ctx.fillStyle = color.textHex;
			ctx.font = "bold 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(color.name, 0, 0);
			ctx.restore();
		});

		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.26, 0, 2 * Math.PI);
		ctx.fillStyle = "#020617";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.22, 0, 2 * Math.PI);
		ctx.fillStyle = "#e5e7eb";
		ctx.fill();

		ctx.fillStyle = "#111827";
		ctx.font = "bold 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Couleurs", 0, -4);
		ctx.font = "11px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.fillText("MTG", 0, 10);

		ctx.beginPath();
		ctx.moveTo(radius + 10, 0);
		ctx.lineTo(radius - 22, -14);
		ctx.lineTo(radius - 22, 14);
		ctx.closePath();
		ctx.fillStyle = "#22c55e";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#15803d";
		ctx.stroke();

		ctx.restore();
	}, [colorRotation]);

	const handleColorSpin = () => {
		if (isColorSpinning) return;

		const sliceAngle = (2 * Math.PI) / mtgColors.length;
		const targetIndex = Math.floor(Math.random() * mtgColors.length);
		const turns = 3 + Math.floor(Math.random() * 3);

		const startRotation = colorRotation % (2 * Math.PI);
		const A =
			(startRotation + targetIndex * sliceAngle + sliceAngle / 2) %
			(2 * Math.PI);
		const delta = 2 * Math.PI * turns - A;
		const finalRotation = startRotation + delta;

		if (colorWheelAnimationRef.current !== null) {
			cancelAnimationFrame(colorWheelAnimationRef.current);
		}

		const duration = 3500;
		const startTime = performance.now();

		setIsColorSpinning(true);
		setSelectedColor(null);

		const animate = (time: number) => {
			const elapsed = time - startTime;
			const t = Math.min(1, elapsed / duration);
			const eased = easeOutCubic(t);
			const current = startRotation + (finalRotation - startRotation) * eased;
			setColorRotation(current);

			if (t < 1) {
				colorWheelAnimationRef.current = requestAnimationFrame(animate);
			} else {
				setIsColorSpinning(false);
				setColorRotation(finalRotation % (2 * Math.PI));
				setSelectedColor(mtgColors[targetIndex]);
			}
		};

		colorWheelAnimationRef.current = requestAnimationFrame(animate);
	};

	return (
		<main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4 py-10">
			<div className="w-full max-w-5xl flex flex-col items-center gap-10">
				<header className="text-center space-y-2">
					<p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
						PnL &amp; la Roue
					</p>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
						Roue de la Fortune MTG
					</h1>
					<p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
						Clique sur 
						<span className="font-semibold text-emerald-400"> Tourner la roue </span>
					</p>
				</header>

				<section className="grid md:grid-cols-[auto,minmax(0,1fr)] gap-10 items-center w-full">
					<div className="relative flex items-center justify-center">
						<div className="rounded-full bg-slate-900/70 p-4 shadow-[0_0_60px_rgba(16,185,129,0.25)] border border-slate-800">
							<canvas
								ref={canvasRef}
								width={CANVAS_SIZE}
								height={CANVAS_SIZE}
								className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						<div className="space-y-3">
							{loading && (
								<p className="text-sm text-slate-300">
									Chargement des sets depuis Scryfall…
								</p>
							)}
							{error && (
								<p className="text-sm text-red-400">
									Erreur : {error}
								</p>
							)}
							{!loading && !error && (
								<p className="text-xs text-slate-400">
									Sources de données : API publique Scryfall · {sets.length} sets éligibles
								</p>
							)}
						</div>

						<button
							type="button"
							onClick={handleSpin}
							disabled={loading || !!error || isSpinning || !sets.length}
							className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-950 font-semibold px-10 py-4 text-lg shadow-lg shadow-emerald-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
						>
							{isSpinning ? "La roue tourne…" : "Tourner la roue"}
						</button>

						<div className="mt-2 space-y-3">
							{selectedSet ? (
								<div className="space-y-2">
									<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
										Set sélectionné
									</p>
									<h2 className="text-2xl sm:text-3xl font-bold text-slate-50 break-words">
										{selectedSet.name}
									</h2>
									{selectedSet.icon_svg_uri && (
										<div className="flex items-center gap-3 flex-wrap">
											<img
												src={selectedSet.icon_svg_uri}
												alt={selectedSet.name}
												className="w-10 h-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)] bg-slate-900 rounded-md p-1 border border-slate-700"
											/>
											<a
												href={selectedSet.icon_svg_uri}
												target="_blank"
												rel="noreferrer"
												className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 break-all"
											>
												Ouvrir l'icône en grand
											</a>
										</div>
									)}
								</div>
							) : (
								<p className="text-sm text-slate-400">
									Lance la roue pour découvrir sur quel set tu vas drafter ou construire ton prochain deck.
								</p>
							)}
						</div>
					</div>
				</section>

				<section className="w-full mt-16 border-t border-slate-800 pt-10 flex flex-col items-center gap-8">
					<div className="text-center space-y-2 max-w-2xl">
						<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
							Roue des couleurs
						</p>
						<h2 className="text-2xl sm:text-3xl font-semibold">
							La Roue de secours
						</h2>
						<p className="text-slate-300 text-sm sm:text-base">
							ta soeur Hugo 
						</p>
					</div>

					<div className="grid md:grid-cols-[auto,minmax(0,1fr)] gap-10 items-center w-full">
						<div className="relative flex items-center justify-center">
							<div className="rounded-full bg-slate-900/70 p-4 shadow-[0_0_50px_rgba(52,211,153,0.25)] border border-slate-800">
								<canvas
									ref={colorCanvasRef}
									width={CANVAS_SIZE}
									height={CANVAS_SIZE}
									className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<button
								type="button"
								onClick={handleColorSpin}
								disabled={isColorSpinning}
								className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-950 font-semibold px-8 py-3 text-base shadow-lg shadow-emerald-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
							>
								{isColorSpinning ? "La roue des couleurs tourne…" : "Tourner la roue des couleurs"}
							</button>

							<div className="space-y-2">
								{selectedColor ? (
									<div className="space-y-2">
										<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
											Couleur sélectionnée
										</p>
										<div className="flex items-center gap-3 flex-wrap">
											<div
												className="w-8 h-8 rounded-full border border-slate-700 shadow-inner"
												style={{ backgroundColor: selectedColor.hex }}
											/>
											<h3 className="text-xl font-semibold text-slate-50">
												{selectedColor.name} ({selectedColor.id})
											</h3>
										</div>
										<p className="text-sm text-slate-400">
											Utilise cette couleur comme point de départ pour ton prochain deck, ton commandant ou ton archétype préféré.
										</p>
									</div>
								) : (
									<p className="text-sm text-slate-400">
										Fais tourner la roue pour laisser le hasard décider si tu pars sur un deck agressif rouge, un contrôle bleu, un midrange vert… ou autre.
									</p>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default PnlEtLaRouePage;

