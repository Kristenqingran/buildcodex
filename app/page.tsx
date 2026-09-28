import Link from 'next/link';
import {siteContent} from '@/lib/site-content';

export default function HomePage() {
  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label="BuildCodex home">
          {siteContent.name}
        </Link>
        <span className="status-pill">New foundation</span>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">A new beginning</p>
        <h1 id="hero-title">Build something worth returning to.</h1>
        <p className="hero-copy">
          {siteContent.tagline} This lightweight home is ready for the next idea.
        </p>
        <a className="primary-button" href="#next">
          Explore the foundation <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="foundation" id="next" aria-labelledby="foundation-title">
        <div>
          <p className="eyebrow">The foundation</p>
          <h2 id="foundation-title">Simple by design.</h2>
        </div>
        <p>
          The old site has been cleared away. This is a focused starting point for a new
          product, new content, and a new visual language.
        </p>
      </section>

      <footer className="footer">
        <span>{siteContent.name}</span>
        <span>Built for the next chapter.</span>
      </footer>
    </main>
  );
}
