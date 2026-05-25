export interface Project {
	name: string;
	period: string;
	stack: string[];
	description: string;
	href?: string;
	/** Ruta bajo public/, ej. projects/nova-rpg.jpg */
	image?: string;
	badge?: 'production' | 'opensource' | 'youtube';
	/** Enlace del chip (ej. canal de YouTube) */
	badgeHref?: string;
	/** ID de video de YouTube para embed en la tarjeta (en lugar de image) */
	youtubeId?: string;
	featured?: boolean;
	/** lead/support = fila 1 (70/30); trio = fila 2 (3 cols); wide = ancho completo */
	layout?: 'lead' | 'support' | 'trio' | 'wide' | 'default';
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
		description: 'Gestión ágil del equipo Agroideas: sprints, esfuerzo, notas TipTap, adjuntos.',
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
		image: 'projects/moo-raiders.png',
		badge: 'opensource',
		featured: true,
		layout: 'trio',
	},
	{
		name: 'online-notes',
		period: 'PWA',
		stack: ['Vue 3', 'Netlify'],
		description: 'Notas rápidas en la nube.',
		href: 'https://speedy-notes.netlify.app',
		image: 'projects/online-notes.png',
		badge: 'production',
		layout: 'trio',
	},
	{
		name: 'cams / onvix',
		period: 'Visión',
		stack: ['FastAPI', 'OpenCV', 'YOLOv8', 'Vue 3'],
		description: 'Monitoreo IP/ONVIF, detección de personas, notificaciones.',
		layout: 'trio',
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
