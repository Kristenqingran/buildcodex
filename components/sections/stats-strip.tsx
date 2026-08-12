export function StatsStrip({items}: {items: ReadonlyArray<{value: string; label: string}>}) {
  return <section className="stats-strip" id="stats" data-testid="landing-section">{items.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</section>;
}
