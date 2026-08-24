type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  startSeconds?: number | string;
};

export function YouTubeEmbed({videoId, title, startSeconds}: YouTubeEmbedProps) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }

  return (
    <div style={{aspectRatio: '16 / 9', width: '100%', marginBlock: '2rem'}}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}${startSeconds ? `?start=${startSeconds}` : ''}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{border: 0, display: 'block', height: '100%', width: '100%'}}
      />
    </div>
  );
}
