import {Link} from '@/i18n/navigation';
import type {TutorialSummary} from '@/lib/content';
import type {SectionSlug} from '@/lib/site-content';

export function TutorialCard({tutorial, section = 'tutorials'}: {tutorial: TutorialSummary; section?: SectionSlug | 'tutorials'}) { return <article className="tutorial-card"><p className="card-kicker">{tutorial.category}</p><h2><Link href={`/${section}/${tutorial.slug}/`}>{tutorial.title}</Link></h2><p>{tutorial.description}</p></article>; }
