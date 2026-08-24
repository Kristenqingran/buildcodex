import Image from 'next/image';

export function Hero({copy}: {copy: {eyebrow: string; title: string; description: string}}) {
  return <section className="landing-hero" id="hero" data-testid="landing-section"><Image src="/assets/mistfall-hunter/mistfall-hunter-hero.webp" alt="Mistfall Hunter Gyldhunter beneath the white tree" fill priority sizes="100vw" /><div className="hero-shade" /><div className="hero-content"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><p>{copy.description}</p></div><span className="hero-scroll">SCROLL ↓</span></section>;
}
