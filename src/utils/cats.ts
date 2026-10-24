/** Evento global para invocar un gato desde cualquier botón del sitio. */
export const SUMMON_CAT_EVENT = 'summon-cat'

export function summonCat() {
  window.dispatchEvent(new CustomEvent(SUMMON_CAT_EVENT))
}
