export function BottomCta({copy, classesHref}: {copy: {eyebrow: string; title: string; primary: string; secondary: string}; classesHref: string}) {
  return <section className="bottom-cta" id="bottom-cta" data-testid="landing-section"><span className="eyebrow">{copy.eyebrow}</span><h2>{copy.title}</h2><div><a className="button" href={classesHref}>{copy.primary}</a><a className="button button-secondary" href="https://store.steampowered.com/app/3282300/Mistfall_Hunter/">{copy.secondary}</a></div></section>;
}
