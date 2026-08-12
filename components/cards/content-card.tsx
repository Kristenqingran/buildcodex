import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';

export function ContentCard({eyebrow, title, description, href, image, action, children}: {
  eyebrow: string; title: string; description: string; href: string; image?: string; action: string; children?: ReactNode;
}) {
  return (
    <Link className="content-card" href={href}>
      {image && <div className="card-image"><Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div>}
      <div className="card-body"><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{description}</p>{children}<span className="card-action">{action} →</span></div>
    </Link>
  );
}
