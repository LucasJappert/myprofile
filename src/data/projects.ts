export interface Project {
	name: string;
	period: string;
	stack: string[];
	description: string;
	href?: string;
	/** Ruta bajo public/, ej. projects/nova-rpg.jpg */
	image?: string;
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
		stack: ['Vue 3', 'TypeScript', 'Vite', 'Firebase', 'PWA'],
		description: 'Gestión ágil del equipo Agroideas: sprints, esfuerzo, notas colaborativas y adjuntos.',
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
			'API central con IA. Integración de modelos de lenguaje, datos satelitales, contenido agronómico y jobs asíncronos.',
		badge: 'production',
		layout: 'row2-compact',
	},
	{
		name: 'APIX',
		period: 'Producción',
		stack: ['FastAPI', 'Google Earth Engine', 'YOLOv8'],
		description:
			'Agricultura de precisión. NDVI, mapas de rendimiento, prescripciones y análisis de margen bruto.',
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
