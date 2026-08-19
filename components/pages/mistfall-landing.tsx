import Image from 'next/image';
import {BuildCard} from '@/components/cards/build-card';
import {ClassCard} from '@/components/cards/class-card';
import {GuideCard} from '@/components/cards/guide-card';
import {WeaponCard} from '@/components/cards/weapon-card';
import {BottomCta} from '@/components/sections/bottom-cta';
import {FactGrid} from '@/components/sections/fact-grid';
import {FaqList} from '@/components/sections/faq-list';
import {Hero} from '@/components/sections/hero';
import {SectionHeading} from '@/components/sections/section-heading';
import {StatsStrip} from '@/components/sections/stats-strip';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {localizePath, type Locale} from '@/i18n/routing';
import {pageContent} from '@/lib/page-content';
import {requireGame} from '@/lib/games';

export function MistfallLanding({locale}: {locale: Locale}) {
  const copy = pageContent[locale]; const routes = requireGame('mistfall-hunter').routes;
  const l = (path: string) => localizePath(locale, path);
  return <><SiteHeader locale={locale} pathname={routes.home} /><main>
    <Hero copy={copy.hero} classesHref={l(routes.classes)} guideHref={l(routes.guides)} />
    <StatsStrip items={copy.stats} />
    <section className="page-section overview-section" id="overview" data-testid="landing-section"><div className="overview-copy"><SectionHeading eyebrow={copy.overview.eyebrow} title={copy.overview.title} /><p>{copy.overview.body}</p><div className="overview-image"><Image src="/assets/mistfall-hunter/mistfall-hunter-combat.webp" alt="" fill sizes="50vw" /></div></div><FactGrid facts={[...copy.facts]} /></section>
    <section className="page-section" id="classes" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.classes[0]} title={copy.sections.classes[1]} /><div className="class-grid">{copy.classNames.map(([name,role], index) => <ClassCard key={name} eyebrow={role} title={name} description={locale === 'en' ? 'Weapons, role, strengths and the decisions that define this hunter.' : '了解武器、定位、优势以及决定该职业玩法的关键选择。'} href={l(routes.classes)} image={index < 2 ? '/assets/mistfall-hunter/mistfall-hunter-classes.webp' : undefined} action={copy.cards.explore} />)}</div></section>
    <section className="page-section muted-section" id="guides" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.guides[0]} title={copy.sections.guides[1]} /><div className="guide-grid"><GuideCard eyebrow="START HERE" title={locale === 'en' ? 'Beginner Guide' : '新手指南'} description={locale === 'en' ? 'Your first runs: free loadouts, extraction choices and survival fundamentals.' : '第一次出猎需要了解的免费装备、撤离选择与生存基础。'} href="#featured-guides" image="/assets/mistfall-hunter/mistfall-hunter-squad.webp" action={copy.cards.open} /><GuideCard eyebrow="CLASSES" title={locale === 'en' ? 'Choose Your Hunter' : '选择你的猎人'} description={locale === 'en' ? 'Compare all six class identities before investing in a build.' : '投入配装之前，对比六大职业的核心定位。'} href={l(routes.classes)} action={copy.cards.open} /><GuideCard eyebrow="EDITORIAL" title={locale === 'en' ? 'Best Class Guide' : '最强职业指南'} description={locale === 'en' ? 'A dated ranking for learning, solo play and coordinated teams.' : '面向上手、单人作战和固定队的时效性评级。'} href={l(routes.bestClass)} action={copy.cards.open} /></div></section>
    <section className="page-section" id="builds" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.builds[0]} title={copy.sections.builds[1]} /><div className="tool-grid"><BuildCard eyebrow="BUILDS" title={locale === 'en' ? 'Best Builds' : '最佳配装'} description={locale === 'en' ? 'Practical loadout directions collected from current research.' : '基于现有资料整理的实用配装方向。'} href={l(routes.builds)} image="/assets/mistfall-hunter/mistfall-hunter-builds.webp" action={copy.cards.open} /><GuideCard eyebrow="TIER" title={locale === 'en' ? 'Best Class' : '最强职业'} description={locale === 'en' ? 'Solo, beginner and team recommendations with clear caveats.' : '包含适用条件的单人、新手与组队推荐。'} href={l(routes.bestClass)} action={copy.cards.open} /><WeaponCard eyebrow="WEAPONS" title={locale === 'en' ? 'Best Weapons' : '最佳武器'} description={locale === 'en' ? 'Weapon stance priorities and the playstyles they enable.' : '武器姿态优先级及其对应玩法。'} href="#weapons" image="/assets/mistfall-hunter/mistfall-hunter-weapons.webp" action={copy.cards.open} /><GuideCard eyebrow="START" title={locale === 'en' ? 'Beginner Guide' : '新手指南'} description={locale === 'en' ? 'A grounded route through your first successful extractions.' : '从第一次进入金雾到成功撤离的清晰路线。'} href="#featured-guides" action={copy.cards.open} /></div><span id="weapons" className="anchor-target" /></section>
    <section className="page-section muted-section" id="featured-guides" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.featured[0]} title={copy.sections.featured[1]} /><div className="featured-list"><a href={l(routes.bestClass)}><span>01</span><strong>{locale === 'en' ? 'Best Class for Solo & Teams' : '单人及组队最强职业'}</strong><em>READ →</em></a><a href={l(routes.classes)}><span>02</span><strong>{locale === 'en' ? 'All Six Classes Explained' : '六大职业完整解析'}</strong><em>READ →</em></a><a href="#weapons"><span>03</span><strong>{locale === 'en' ? 'Weapon Stances to Learn First' : '优先学习的武器姿态'}</strong><em>READ →</em></a></div></section>
    <section className="page-section" id="faq" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.faq[0]} title={copy.sections.faq[1]} /><FaqList items={[...copy.faq]} /></section>
    <BottomCta copy={copy.cta} classesHref={l(routes.classes)} />
    <div id="footer" data-testid="landing-section"><SiteFooter locale={locale} /></div>
  </main></>;
}
