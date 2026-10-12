import type {Metadata} from 'next';
import {WorkbenchEmptyState} from '@/components/workbench/empty-state';
import {WorkbenchShell} from '@/components/workbench/workbench-shell';
import {getWorkbenchCopy} from '@/lib/workbench';
import {buildMetadata} from '@/lib/seo';
import type {Locale} from '@/lib/site-content';

export async function generateMetadata({params}: PageProps<'/[locale]/workbench/test-cases'>): Promise<Metadata> { const {locale} = await params; const copy = getWorkbenchCopy(locale as Locale); return buildMetadata(locale as Locale, `${copy.emptyCases} · ${copy.title}`, copy.emptyCasesBody, '/workbench/test-cases/'); }
export default async function TestCasesPage({params}: PageProps<'/[locale]/workbench/test-cases'>) { const {locale} = await params; const typedLocale = locale as Locale; const copy = getWorkbenchCopy(typedLocale); return <WorkbenchShell locale={typedLocale}><main className="workbench-page"><section className="workbench-page-heading"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.emptyCases}</h1><p className="lede">{copy.emptyCasesBody}</p></section><WorkbenchEmptyState title={copy.emptyCases} body={copy.emptyCasesBody}/></main></WorkbenchShell>; }
