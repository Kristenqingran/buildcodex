export function SectionHeading({eyebrow, title, description}: {eyebrow: string; title: string; description?: string}) {
  return <header className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</header>;
}
