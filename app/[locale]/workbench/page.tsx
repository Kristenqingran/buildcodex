import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {AgentStatusCard} from '@/components/workbench/agent-status-card';
import {WorkbenchShell} from '@/components/workbench/workbench-shell';
import {getWorkbenchCopy} from '@/lib/workbench';
import {buildMetadata} from '@/lib/seo';
import type {Locale} from '@/lib/site-content';

export async function generateMetadata({params}: PageProps<'/[locale]/workbench'>): Promise<Metadata> { const {locale} = await params; const copy = getWorkbenchCopy(locale as Locale); return buildMetadata(locale as Locale, copy.title, copy.intro, '/workbench/'); }
export default async function WorkbenchOverviewPage({params}: PageProps<'/[locale]/workbench'>) { const {locale} = await params; const typedLocale = locale as Locale; const copy = getWorkbenchCopy(typedLocale); return <WorkbenchShell locale={typedLocale}><main className="workbench-page"><section className="workbench-hero"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p className="lede">{copy.intro}</p><p className="workbench-overview-copy">{copy.overview}</p></section><AgentStatusCard locale={typedLocale}/><section className="workbench-overview-grid"><Link href="/workbench/test-case-generation/"><span className="card-kicker">01</span><h2>{copy.steps[0]}</h2><p>{copy.pending}</p></Link><Link href="/workbench/test-cases/"><span className="card-kicker">02</span><h2>{copy.emptyCases}</h2><p>{copy.emptyCasesBody}</p></Link><Link href="/workbench/runs/"><span className="card-kicker">03</span><h2>{copy.emptyRuns}</h2><p>{copy.emptyRunsBody}</p></Link></section></main></WorkbenchShell>; }
