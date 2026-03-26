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

type CommanderSet = {
	name: string;
	codes: string;
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

const commanderSets: CommanderSet[] = [
	{ name: "New Capenna", codes: "ncc + snc" },
	{ name: "Lost Caverns of Ixalan", codes: "lcc + lci" },
	{ name: "Forgotten Realms", codes: "afc + afr" },
	{ name: "Modern Horizons 3", codes: "m3c + mh3" },
	{ name: "Neon Dynasty", codes: "nec + neo" },
	{ name: "Murders at Karlov Manor", codes: "mkc + mkm" },
	{ name: "Commander Masters", codes: "CMM" },
	{ name: "March of the Machine", codes: "moc + mom" },
	{ name: "Warhammer 40k + Fallout", codes: "40K + PIP" },
	{ name: "Midnight Hunt", codes: "mic + mid" },
	{ name: "Crimson Vow", codes: "voc + vow" },
	{ name: "The Brothers' War", codes: "brc + bro" },
	{ name: "Thunder Junction", codes: "otc + otj" },
	{ name: "Kaldheim", codes: "khc + khm" },
	{ name: "Phyrexia: All Will Be One", codes: "onc + one" },
	{ name: "Bloomburrow", codes: "blc + blb" },
	{ name: "Wilds of Eldraine", codes: "woc + woe" },
	{ name: "Zendikar Rising", codes: "znc + znr" },
	{ name: "Commander Legends", codes: "CMR" },
	{ name: "Battle for Baldur's Gate", codes: "CLB" },
	{ name: "Commander 2021", codes: "C21" },
	{ name: "Commander 2020", codes: "C20" },
	{ name: "Commander 2019", codes: "C19" },
	{ name: "Commander 2018", codes: "C18" },
	{ name: "Commander 2017", codes: "C17" },
	{ name: "Commander 2016", codes: "C16" },
	{ name: "Commander 2015", codes: "C15" },
	{ name: "Commander 2014", codes: "C14" },
	{ name: "Commander 2013", codes: "C13" },
	{ name: "Commander 2011", codes: "CMD" },
	{ name: "Limited Edition Alpha", codes: "LEA" },
	{ name: "Limited Edition Beta", codes: "LEB" },
	{ name: "Unlimited Edition", codes: "2ED" },
	{ name: "Arabian Nights", codes: "ARN" },
	{ name: "Antiquities", codes: "ATQ" },
	{ name: "Revised Edition", codes: "3ED" },
	{ name: "Legends", codes: "LEG" },
	{ name: "The Dark", codes: "DRK" },
	{ name: "Fallen Empires", codes: "FEM" },
	{ name: "Fourth Edition", codes: "4ED" },
	{ name: "Ice Age", codes: "ICE" },
	{ name: "Chronicles", codes: "CHR" },
	{ name: "Homelands", codes: "HML" },
	{ name: "Alliances", codes: "ALL" },
	{ name: "Mirage", codes: "MIR" },
	{ name: "Visions", codes: "VIS" },
	{ name: "Fifth Edition", codes: "5ED" },
	{ name: "Weatherlight", codes: "WTH" },
	{ name: "Tempest", codes: "TMP" },
	{ name: "Stronghold", codes: "STH" },
	{ name: "Exodus", codes: "EXO" },
	{ name: "Urza's Saga", codes: "USG" },
	{ name: "Urza's Legacy", codes: "ULG" },
	{ name: "Classic Sixth Edition", codes: "6ED" },
	{ name: "Urza's Destiny", codes: "UDS" },
	{ name: "Mercadian Masques", codes: "MMQ" },
	{ name: "Nemesis", codes: "NMS" },
	{ name: "Prophecy", codes: "PCY" },
	{ name: "Invasion", codes: "INV" },
	{ name: "Planeshift", codes: "PLS" },
	{ name: "Seventh Edition", codes: "7ED" },
	{ name: "Apocalypse", codes: "APC" },
	{ name: "Odyssey", codes: "ODY" },
	{ name: "Torment", codes: "TOR" },
	{ name: "Judgment", codes: "JUD" },
	{ name: "Onslaught", codes: "ONS" },
	{ name: "Legions", codes: "LGN" },
	{ name: "Scourge", codes: "SCG" },
	{ name: "Eighth Edition", codes: "8ED" },
	{ name: "Mirrodin", codes: "MRD" },
	{ name: "Darksteel", codes: "DST" },
	{ name: "Fifth Dawn", codes: "5DN" },
	{ name: "Champions of Kamigawa", codes: "CHK" },
	{ name: "Betrayers of Kamigawa", codes: "BOK" },
	{ name: "Saviors of Kamigawa", codes: "SOK" },
	{ name: "Ninth Edition", codes: "9ED" },
	{ name: "Ravnica: City of Guilds", codes: "RAV" },
	{ name: "Guildpact", codes: "GPT" },
	{ name: "Dissension", codes: "DIS" },
	{ name: "Coldsnap", codes: "CSP" },
	{ name: "Time Spiral", codes: "TSP" },
	{ name: "Planar Chaos", codes: "PLC" },
	{ name: "Future Sight", codes: "FUT" },
	{ name: "Tenth Edition", codes: "10E" },
	{ name: "Lorwyn", codes: "LRW" },
	{ name: "Morningtide", codes: "MOR" },
	{ name: "Shadowmoor", codes: "SHM" },
	{ name: "Eventide", codes: "EVE" },
	{ name: "Shards of Alara", codes: "ALA" },
	{ name: "Conflux", codes: "CON" },
	{ name: "Alara Reborn", codes: "ARB" },
	{ name: "Magic 2010", codes: "M10" },
	{ name: "Zendikar", codes: "ZEN" },
	{ name: "Worldwake", codes: "WWK" },
	{ name: "Rise of the Eldrazi", codes: "ROE" },
	{ name: "Magic 2011", codes: "M11" },
	{ name: "Scars of Mirrodin", codes: "SOM" },
	{ name: "Mirrodin Besieged", codes: "MBS" },
	{ name: "New Phyrexia", codes: "NPH" },
	{ name: "Magic 2012", codes: "M12" },
	{ name: "Innistrad", codes: "ISD" },
	{ name: "Dark Ascension", codes: "DKA" },
	{ name: "Avacyn Restored", codes: "AVR" },
	{ name: "Magic 2013", codes: "M13" },
	{ name: "Return to Ravnica", codes: "RTR" },
	{ name: "Gatecrash", codes: "GTC" },
	{ name: "Dragon's Maze", codes: "DGM" },
	{ name: "Magic 2014", codes: "M14" },
	{ name: "Theros", codes: "THS" },
	{ name: "Born of the Gods", codes: "BNG" },
	{ name: "Journey into Nyx", codes: "JOU" },
	{ name: "Magic 2015", codes: "M15" },
	{ name: "Khans of Tarkir", codes: "KTK" },
	{ name: "Fate Reforged", codes: "FRF" },
	{ name: "Dragons of Tarkir", codes: "DTK" },
	{ name: "Magic Origins", codes: "ORI" },
	{ name: "Battle for Zendikar", codes: "BFZ" },
	{ name: "Oath of the Gatewatch", codes: "OGW" },
	{ name: "Shadows over Innistrad", codes: "SOI" },
	{ name: "Eldritch Moon", codes: "EMN" },
	{ name: "Kaladesh", codes: "KLD" },
	{ name: "Aether Revolt", codes: "AER" },
	{ name: "Amonkhet", codes: "AKH" },
	{ name: "Hour of Devastation", codes: "HOU" },
	{ name: "Ixalan", codes: "XLN" },
	{ name: "Rivals of Ixalan", codes: "RIX" },
	{ name: "Dominaria", codes: "DOM" },
	{ name: "Core Set 2019", codes: "M19" },
	{ name: "Guilds of Ravnica", codes: "GRN" },
	{ name: "Ravnica Allegiance", codes: "RNA" },
	{ name: "War of the Spark", codes: "WAR" },
	{ name: "Core Set 2020", codes: "M20" },
	{ name: "Throne of Eldraine", codes: "ELD" },
	{ name: "Theros Beyond Death", codes: "THB" },
	{ name: "Core Set 2021", codes: "M21" },
	{ name: "Modern Horizons", codes: "MH1" },
	{ name: "Modern Horizons 2", codes: "MH2" },
	{ name: "Modern Horizons 3 (set)", codes: "MH3" },
	{ name: "Double Masters", codes: "2XM" },
	{ name: "Jumpstart", codes: "JMP" },
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

	const [commanderRotation, setCommanderRotation] = useState<number>(0);
	const [isCommanderSpinning, setIsCommanderSpinning] = useState<boolean>(false);
	const [selectedCommander, setSelectedCommander] = useState<CommanderSet | null>(
		null
	);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const colorCanvasRef = useRef<HTMLCanvasElement | null>(null);
	const setWheelAnimationRef = useRef<number | null>(null);
	const colorWheelAnimationRef = useRef<number | null>(null);
	const commanderWheelAnimationRef = useRef<number | null>(null);

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
			if (commanderWheelAnimationRef.current !== null) {
				cancelAnimationFrame(commanderWheelAnimationRef.current);
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

	useEffect(() => {
		const canvas = commanderCanvasRef.current;
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

		const sliceAngle = (2 * Math.PI) / commanderSets.length;

		commanderSets.forEach((entry, index) => {
			const startAngle = commanderRotation + index * sliceAngle;
			const endAngle = startAngle + sliceAngle;

			const hue = (index / commanderSets.length) * 360;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fillStyle = `hsl(${hue}, 65%, 55%)`;
			ctx.fill();

			ctx.strokeStyle = "#020617";
			ctx.lineWidth = 1;
			ctx.stroke();

			const midAngle = startAngle + sliceAngle / 2;
			const textRadius = radius * 0.7;
			const x = Math.cos(midAngle) * textRadius;
			const y = Math.sin(midAngle) * textRadius;

			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(midAngle);
			ctx.fillStyle = "#020617";
			ctx.font =
				"11px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const label =
				entry.name.length > 24 ? entry.name.slice(0, 21) + "…" : entry.name;
			ctx.fillText(label, 0, 0);
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
		ctx.font =
			"bold 13px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Commander", 0, -4);
		ctx.font =
			"11px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
		ctx.fillText("Sets", 0, 10);

		ctx.beginPath();
		ctx.moveTo(radius + 10, 0);
		ctx.lineTo(radius - 22, -14);
		ctx.lineTo(radius - 22, 14);
		ctx.closePath();
		ctx.fillStyle = "#fbbf24";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#b45309";
		ctx.stroke();

		ctx.restore();
	}, [commanderRotation]);

	const commanderCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const handleCommanderSpin = () => {
		if (isCommanderSpinning) return;

		const sliceAngle = (2 * Math.PI) / commanderSets.length;
		const targetIndex = Math.floor(Math.random() * commanderSets.length);
		const turns = 4 + Math.floor(Math.random() * 3);

		const startRotation = commanderRotation % (2 * Math.PI);
		const A =
			(startRotation + targetIndex * sliceAngle + sliceAngle / 2) %
			(2 * Math.PI);
		const delta = 2 * Math.PI * turns - A;
		const finalRotation = startRotation + delta;

		if (commanderWheelAnimationRef.current !== null) {
			cancelAnimationFrame(commanderWheelAnimationRef.current);
		}

		const duration = 4500;
		const startTime = performance.now();

		setIsCommanderSpinning(true);
		setSelectedCommander(null);

		const animate = (time: number) => {
			const elapsed = time - startTime;
			const t = Math.min(1, elapsed / duration);
			const eased = easeOutCubic(t);
			const current = startRotation + (finalRotation - startRotation) * eased;
			setCommanderRotation(current);

			if (t < 1) {
				commanderWheelAnimationRef.current = requestAnimationFrame(animate);
			} else {
				setIsCommanderSpinning(false);
				setCommanderRotation(finalRotation % (2 * Math.PI));
				setSelectedCommander(commanderSets[targetIndex]);
			}
		};

		commanderWheelAnimationRef.current = requestAnimationFrame(animate);
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

				<section className="w-full mt-16 border-t border-slate-800 pt-10 flex flex-col items-center gap-8">
					<div className="text-center space-y-2 max-w-2xl">
						<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
							Roue Commander
						</p>
						<h2 className="text-2xl sm:text-3xl font-semibold">
							Choisir un environnement Commander
						</h2>
						<p className="text-slate-300 text-sm sm:text-base">
							Cette roue parcourt une grande liste de sets jouables en Commander
							(classiques, modernes, Masters, etc.). Parfait pour décider d&apos;un environnement
							pour une soirée, une ligue ou un cube thématique.
						</p>
					</div>

					<div className="grid md:grid-cols-[auto,minmax(0,1fr)] gap-10 items-center w-full">
						<div className="relative flex items-center justify-center">
							<div className="rounded-full bg-slate-900/70 p-4 shadow-[0_0_50px_rgba(251,191,36,0.25)] border border-slate-800">
								<canvas
									ref={commanderCanvasRef}
									width={CANVAS_SIZE}
									height={CANVAS_SIZE}
									className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<button
								type="button"
								onClick={handleCommanderSpin}
								disabled={isCommanderSpinning}
								className="inline-flex items-center justify-center rounded-full bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-950 font-semibold px-8 py-3 text-base shadow-lg shadow-amber-400/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
							>
								{isCommanderSpinning
										? "La roue Commander tourne…"
										: "Tourner la roue Commander"}
							</button>

							<div className="space-y-2">
								{selectedCommander ? (
									<div className="space-y-2">
										<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
											Set Commander sélectionné
										</p>
										<h3 className="text-xl sm:text-2xl font-semibold text-slate-50 break-words">
											{selectedCommander.name}
										</h3>
										<p className="text-sm text-emerald-300 font-mono break-all">
											Codes : {selectedCommander.codes}
										</p>
										<p className="text-sm text-slate-400">
											Tu peux utiliser ces codes pour filtrer sur Scryfall, créer un cube dédié
											ou construire des decks autour de cet environnement précis.
										</p>
									</div>
								) : (
									<p className="text-sm text-slate-400">
										Fais tourner la roue pour choisir au hasard une époque ou un bloc comme
										base pour vos parties Commander : vieux blocs historiques, Standards récents,
										Masters, Horizons modernes, etc.
									</p>
								)}
							</div>
						</div>
					</div>
				</section>

				<section className="w-full mt-16 border-t border-slate-800 pt-10 flex flex-col items-center gap-8">
					<div className="text-center space-y-2 max-w-2xl">
						<p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
							Roue des sets
						</p>
						<h2 className="text-2xl sm:text-3xl font-semibold">
							Choisir un set au hasard
						</h2>
						<p className="text-slate-300 text-sm sm:text-base">
							Cette roue parcourt tous les sets jouables (Core, Expansion, Masters, Draft Innovation)
							via l&apos;API Scryfall.
						</p>
					</div>

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
				</section>
			</div>
		</main>
	);
};

export default PnlEtLaRouePage;

