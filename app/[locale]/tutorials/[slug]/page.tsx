import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {getTutorial} from '@/lib/content';
import {MdxContent} from '@/components/mdx-content';
import {getCopy, type Locale} from '@/lib/site-content';
import {buildMetadata} from '@/lib/seo';

export async function generateMetadata({params}: PageProps<'/[locale]/tutorials/[slug]'>): Promise<Metadata> { const {locale, slug} = await params; const tutorial = await getTutorial(locale as Locale, slug); return buildMetadata(locale as Locale, tutorial.frontmatter.title, tutorial.frontmatter.description, `/tutorials/${slug}/`); }
export default async function TutorialPage({params}: PageProps<'/[locale]/tutorials/[slug]'>) {
  const {locale, slug} = await params; const tutorial = await getTutorial(locale as Locale, slug); const text = getCopy(locale as Locale);
  return <main className="content-page article-page"><Link className="back-link" href="/tutorials/">← {text.tutorialsTitle}</Link><article><p className="eyebrow">{tutorial.frontmatter.category}</p><h1>{tutorial.frontmatter.title}</h1><p className="article-intro">{tutorial.frontmatter.description}</p><MdxContent source={tutorial.content}/></article></main>;
}
