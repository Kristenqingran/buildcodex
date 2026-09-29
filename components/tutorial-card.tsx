import {Link} from '@/i18n/navigation';
import type {TutorialSummary} from '@/lib/content';

export function TutorialCard({tutorial}: {tutorial: TutorialSummary}) { return <article className="tutorial-card"><p className="card-kicker">{tutorial.category}</p><h2><Link href={`/tutorials/${tutorial.slug}/`}>{tutorial.title}</Link></h2><p>{tutorial.description}</p></article>; }
