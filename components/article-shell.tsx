import type {ReactNode} from 'react';
export function ArticleShell({eyebrow, title, description, meta, children}: {eyebrow: string; title: string; description: string; meta?: string; children: ReactNode}) {
  return <main className="article-shell"><header className="article-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{meta && <span className="article-meta">{meta}</span>}</header><article className="prose">{children}</article></main>;
}
