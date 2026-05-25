export function youtubePosterSrc(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

/** Embed en loop, silenciado; playlist=id necesario para que loop funcione */
export function youtubeEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`
}
