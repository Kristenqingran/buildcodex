import type {Metadata} from 'next';
import {RequirementInput} from '@/components/workbench/requirement-input';
import {WorkbenchShell} from '@/components/workbench/workbench-shell';
import {getWorkbenchCopy} from '@/lib/workbench';
import {buildMetadata} from '@/lib/seo';
import type {Locale} from '@/lib/site-content';

export async function generateMetadata({params}: PageProps<'/[locale]/workbench/test-case-generation'>): Promise<Metadata> { const {locale} = await params; const copy = getWorkbenchCopy(locale as Locale); return buildMetadata(locale as Locale, `${copy.generationTitle} · ${copy.title}`, copy.pending, '/workbench/test-case-generation/'); }
export default async function TestCaseGenerationPage({params}: PageProps<'/[locale]/workbench/test-case-generation'>) { const {locale} = await params; const typedLocale = locale as Locale; const copy = getWorkbenchCopy(typedLocale); return <WorkbenchShell locale={typedLocale}><main className="workbench-page"><section className="workbench-page-heading"><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.generationTitle}</h1><p className="lede">{copy.generationDescription}</p></section><section className="workbench-pipeline" aria-label={copy.pipeline}><span className="card-kicker">{copy.pipeline}</span>{copy.steps.map((step, index) => <div key={step}><b>0{index + 1}</b><strong>{step}</strong>{index < copy.steps.length - 1 && <span aria-hidden="true">→</span>}</div>)}</section><RequirementInput locale={typedLocale}/></main></WorkbenchShell>; }
