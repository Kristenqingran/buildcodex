export function FactGrid({facts}: {facts: Array<{label: string; value: string}>}) {
  return <dl className="fact-grid">{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>;
}
