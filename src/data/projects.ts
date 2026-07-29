export interface Project {
	name: string;
	period: string;
	stack: string[];
	description: string;
	href?: string;
	/** Ruta bajo public/, ej. projects/nova-rpg.jpg */
	image?: string;
	/** Varias capturas (galería); tiene prioridad sobre image */
	images?: string[];
	badge?: 'production' | 'opensource' | 'youtube' | 'itchio';
	/** Enlace del chip (ej. canal de YouTube) */
	badgeHref?: string;
	/** ID de video de YouTube para embed en la tarjeta (en lugar de image) */
	youtubeId?: string;
	featured?: boolean;
	/** lead/support = fila 1; row2-primary/compact = fila 2 (50/50); wide = ancho completo */
	layout?: 'lead' | 'support' | 'row2-primary' | 'row2-compact' | 'wide' | 'default';
}

export const projects: Project[] = [
	{
		name: 'Memorable Summaries',
		period: 'Producto personal',
		stack: ['Vue 3', 'TypeScript', 'Vite', 'TTS', 'LLMs'],
		description:
			'Que lo leído no se olvide: repasar y memorizar con sentido. Resúmenes interactivos de libros — biblioteca, capítulos y cola de audio. Pipeline con IA: libro → markdown → vista → narración TTS (OmniVoice).',
		href: 'https://lucasjappert.github.io/memorable-summaries/',
		images: [
			'assets/memorable-summaries/biblioteca.webp',
			'assets/memorable-summaries/libro.webp',
			'assets/memorable-summaries/reproductor.webp',
		],
		badge: 'opensource',
		featured: true,
		layout: 'wide',
	},
	{
		name: 'GanasDeSaber',
		period: 'Canal YouTube',
		stack: ['FastAPI', 'Vue 3', 'DeepSeek', 'OmniVoice', 'FFmpeg'],
		description:
			'Buscamos incentivar la curiosidad con ciencia clara y cercana. Canal de divulgación con fábrica propia de videos (yt-video-factory): origen → guion LLM → escenas → TTS → render FFmpeg → miniaturas → YouTube.',
		href: 'https://www.youtube.com/@GanasDeSaber',
		image: 'assets/ganas-de-saber/image.webp',
		badge: 'youtube',
		badgeHref: 'https://www.youtube.com/@GanasDeSaber',
		featured: true,
		layout: 'wide',
	},
	{
		name: 'DayLog',
		period: 'Producto personal',
		stack: ['Vue 3', 'FastAPI', 'lucas-ai-api', 'Chart.js', 'SQLite'],
		description:
			'Ver el día con claridad: métricas personales en un solo lugar. Dashboard de hábitos, PC, recordatorios, costos Orca y salud de servicios — backend unificado en lucas-ai-api (FastAPI + SQLite; OrcaRouter, Hermes, OmniVoice/Whisper).',
		href: 'https://daylog-lucas.netlify.app',
		image: 'assets/daylog/home.webp',
		badge: 'production',
		featured: true,
		layout: 'wide',
	},
	{
		name: 'Nova RPG',
		period: '2015 – Presente',
		stack: ['VB.NET', 'C#', 'MonoGame', 'TCP'],
		description: 'MMORPG 2D cliente-servidor: clanes, dungeons, PvP, +10 años de evolución.',
		href: 'https://novarpgoficial.com',
		youtubeId: 'VRarAjHraOw',
		badge: 'youtube',
		badgeHref: 'https://www.youtube.com/@novarpgoficial',
		featured: true,
		layout: 'lead',
	},
	{
		name: 'sprint-it',
		period: 'Producción',
		stack: ['Vue 3', 'TypeScript', 'Socket.IO', 'PWA'],
		description:
			'Gestión ágil del equipo Agroideas (en Agroideas-In): sprints, esfuerzo, notas y resúmenes con IA.',
		href: 'https://github.com/LucasJappert/sprint-it',
		image: 'projects/sprint-it.png',
		badge: 'production',
		featured: true,
		layout: 'support',
	},
	{
		name: 'Moo Raiders',
		period: 'Godot 4.4',
		stack: ['GDScript', 'ENet', 'LAN'],
		description:
			'Wave defense cooperativo multijugador (inspirado en Moo Moo): héroes, items y servidor autoritativo.',
		href: 'https://github.com/LucasJappert/moomoo-lan-party',
		youtubeId: 'tlN-feT4x44',
		badge: 'itchio',
		badgeHref: 'https://lucasjappert.itch.io/mooraiders',
		featured: true,
		layout: 'row2-primary',
	},
	{
		name: 'Hermes Agent',
		period: 'Open source',
		stack: ['Python', 'LLMs', 'Cronjobs'],
		description:
			'Automatización con agentes de IA. Cronjobs, skills personalizados y gateways multi-modelo.',
		badge: 'opensource',
		layout: 'row2-compact',
	},
	{
		name: 'api-core',
		period: 'Producción',
		stack: ['FastAPI', 'Python', 'Azure', 'LLMs'],
		description:
			'Plataforma compartida: gateway LLM, clima, noticias agro, métricas y servicios transversales.',
		badge: 'production',
		layout: 'row2-compact',
	},
	{
		name: 'APIX',
		period: 'Producción',
		stack: ['Vue 3', 'FastAPI', 'GEE', 'YOLOv8'],
		description:
			'Agricultura de precisión: ambientaciones, satélite, penetrometría, drone/CV y mapas de productividad.',
		badge: 'production',
		layout: 'row2-compact',
	},
	{
		name: 'new-aoe-overlay',
		period: 'Streamers',
		stack: ['Vue 3', 'WebSocket'],
		description: 'Overlay AoE2 DE: ELO, civs, win probability en vivo.',
		href: 'https://lucasjappert.github.io/new-aoe-overlay-public/',
		image: 'projects/aoe-overlay1.png',
		badge: 'opensource',
		layout: 'wide',
	},
];
