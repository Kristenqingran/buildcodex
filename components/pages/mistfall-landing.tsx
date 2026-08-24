import Image from 'next/image';
import Link from 'next/link';
import {BuildCard} from '@/components/cards/build-card';
import {ClassCard} from '@/components/cards/class-card';
import {GuideCard} from '@/components/cards/guide-card';
import {WeaponCard} from '@/components/cards/weapon-card';
import {BottomCta} from '@/components/sections/bottom-cta';
import {FactGrid} from '@/components/sections/fact-grid';
import {FaqList} from '@/components/sections/faq-list';
import {Hero} from '@/components/sections/hero';
import {SectionHeading} from '@/components/sections/section-heading';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {localizePath, type Locale} from '@/i18n/routing';
import {pageContent} from '@/lib/page-content';
import {requireGame} from '@/lib/games';

const classImages = [
  {src: '/assets/mistfall-hunter/classes/mercenary.webp', alt: 'Mistfall Hunter Mercenary class'},
  {src: '/assets/mistfall-hunter/classes/sorcerer.webp', alt: 'Mistfall Hunter Sorcerer class'},
  {src: '/assets/mistfall-hunter/classes/blackarrow.webp', alt: 'Mistfall Hunter Blackarrow class'},
  {src: '/assets/mistfall-hunter/classes/shadowstrix.webp', alt: 'Mistfall Hunter Shadowstrix class'},
  {src: '/assets/mistfall-hunter/classes/seer.webp', alt: 'Mistfall Hunter Seer class'},
  {src: '/assets/mistfall-hunter/classes/withered-knight.webp', alt: 'Mistfall Hunter Withered Knight class'}
] as const;

const classAnchors = [
  'mercenary',
  'sorcerer',
  'blackarrow',
  'shadowstrix',
  'seer',
  'withered-knight'
] as const;

const classDescriptions = {
  en: [
    'A straightforward melee fighter with two distinct styles: Sword and Shield for balance and defense, or Hammer for heavier pressure in extended fights.',
    'A versatile spellcaster with offensive and defensive magic, relying on precise timing and control to shape the flow of battle.',
    'A ranged damage dealer who uses Bow attacks, charged shots and special projectiles to keep steady pressure from a safe distance.',
    'A high-risk assassin built around stealth, mobility and fast melee strikes, rewarding precise execution and well-timed engagements.',
    'A faith-powered support class that heals, protects and enables allies, while still offering an offensive path for more aggressive play.',
    'A heavy melee fighter that uses Wither to pressure enemies, with Greatsword for offense and Polearm and Shield for protection.'
  ],
  'zh-CN': [
    '简单直接的近战职业，拥有两种鲜明风格：剑盾兼顾攻防，战锤则能在持久战中施加更沉重的压力。',
    '攻守兼备的多面施法者，依靠精准的出手时机与控制魔法来主导战斗节奏。',
    '使用弓箭、蓄力射击和特殊箭矢的远程输出职业，擅长在安全距离持续压制敌人。',
    '围绕潜行、机动与快速近战打击构建的高风险刺客，精准操作和恰当的进场时机能带来丰厚回报。',
    '借助信仰之力治疗、保护并强化队友的辅助职业，同时也能选择更主动、更具进攻性的玩法路线。',
    '利用凋零之力压迫敌人的重装近战职业，以巨剑发动攻势，或用长柄武器和盾提供防护。'
  ]
} as const satisfies Record<Locale, readonly string[]>;

export function MistfallLanding({locale}: {locale: Locale}) {
  const copy = pageContent[locale]; const routes = requireGame('mistfall-hunter').routes;
  const l = (path: string) => localizePath(locale, path);
  return <><SiteHeader locale={locale} pathname={routes.home} /><main>
    <Hero copy={copy.hero} />
    <section className="page-section overview-section" id="overview" data-testid="landing-section"><div className="overview-copy"><SectionHeading eyebrow={copy.overview.eyebrow} title={copy.overview.title} /><p>{copy.overview.body}</p><div className="overview-image"><Image src="/assets/mistfall-hunter/mistfall-hunter-combat.webp" alt="" fill sizes="50vw" /></div></div><FactGrid facts={[...copy.facts]} /></section>
    <section className="page-section" id="classes" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.classes[0]} title={copy.sections.classes[1]} /><div className="class-grid">{copy.classNames.map(([name,role], index) => <ClassCard key={name} eyebrow={role} title={name} description={classDescriptions[locale][index]} href={`${l(routes.classes)}#${classAnchors[index]}`} image={classImages[index].src} imageAlt={classImages[index].alt} action={copy.cards.explore} />)}</div></section>
    <section className="page-section muted-section" id="guides" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.guides[0]} title={copy.sections.guides[1]} /><div className="guide-grid"><div className="content-card"><div className="card-image"><Image src="/assets/mistfall-hunter/mistfall-hunter-beginner-guide-card.webp" alt="Mistfall Hunter beginner guide" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="card-body"><span className="eyebrow">GUIDE</span><h3>{locale === 'en' ? 'Mistfall Hunter Cipher Guide' : 'Mistfall Hunter 密文指南'}</h3><p>{locale === 'en' ? 'Learn how Ciphers work, how to decipher them, and where each Cipher should be used.' : '了解密文的运作方式、解读方法，以及每种密文应该在哪里使用。'}</p><div className="journey-actions"><Link className="card-action" href={l(routes.cipherGuide)}>{locale === 'en' ? 'OPEN CIPHER GUIDE' : '打开密文指南'} →</Link></div></div></div><div className="content-card"><div className="card-image"><Image src="/assets/mistfall-hunter/mistfall-hunter-classes-guide-card.webp" alt="Mistfall Hunter classes and best class guide" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="card-body"><span className="eyebrow">CLASSES</span><h3>{locale === 'en' ? 'Classes & Best Class' : '职业与最强职业'}</h3><p>{locale === 'en' ? 'Compare all six classes, learn how each one plays, then explore the current Best Class and Tier List guide.' : '对比全部六个职业，了解各自玩法，再查看当前最强职业与 Tier List 指南。'}</p><div className="journey-actions"><Link className="card-action" href={l(routes.classes)}>{locale === 'en' ? 'Explore Classes' : '查看全部职业'} →</Link><Link className="card-action" href={l(routes.bestClass)}>{locale === 'en' ? 'Best Class & Tier List' : '查看最强职业与 Tier List'} →</Link></div></div></div></div></section>
    <section className="page-section" id="builds" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.builds[0]} title={copy.sections.builds[1]} /><div className="tool-grid"><BuildCard eyebrow="BUILDS" title={locale === 'en' ? 'Best Builds' : '最佳配装'} description={locale === 'en' ? 'Practical loadout directions collected from current research.' : '基于现有资料整理的实用配装方向。'} href={l(routes.builds)} image="/assets/mistfall-hunter/mistfall-hunter-builds.webp" action={copy.cards.open} /><GuideCard eyebrow="TIER" title={locale === 'en' ? 'Best Class' : '最强职业'} description={locale === 'en' ? 'Solo, beginner and team recommendations with clear caveats.' : '包含适用条件的单人、新手与组队推荐。'} href={l(routes.bestClass)} image="/assets/mistfall-hunter/mistfall-hunter-classes-guide-card.webp" imageAlt="Mistfall Hunter classes and best class guide" action={copy.cards.open} /><WeaponCard eyebrow="WEAPONS" title={locale === 'en' ? 'Best Weapons' : '最佳武器'} description={locale === 'en' ? 'Weapon stance priorities and the playstyles they enable.' : '武器姿态优先级及其对应玩法。'} href={l(routes.weapons)} image="/assets/mistfall-hunter/mistfall-hunter-weapons.webp" action={copy.cards.open} /><GuideCard eyebrow="CIPHER GUIDE" title={locale === 'en' ? 'Mistfall Hunter Cipher Guide' : 'Mistfall Hunter 密文指南'} description={locale === 'en' ? 'Learn how Ciphers work, where to use them, and which NPC matches each Cipher.' : '了解密文如何运作、应在哪里使用，以及每个密文对应哪位 NPC。'} href={l(routes.cipherGuide)} action={locale === 'en' ? 'OPEN GUIDE' : '打开指南'} /></div><span id="weapons" className="anchor-target" /></section>
    <section className="page-section muted-section" id="featured-guides" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.featured[0]} title={copy.sections.featured[1]} /><div className="featured-list"><a href={l(routes.bestClass)}><span>01</span><strong>{locale === 'en' ? 'Best Class for Solo & Teams' : '单人及组队最强职业'}</strong><em>READ →</em></a><a href={l(routes.classes)}><span>02</span><strong>{locale === 'en' ? 'All Six Classes Explained' : '六大职业完整解析'}</strong><em>READ →</em></a><a href={l(routes.weapons)}><span>03</span><strong>{locale === 'en' ? 'Weapon Stances to Learn First' : '优先学习的武器姿态'}</strong><em>READ →</em></a></div></section>
    <section className="page-section" id="faq" data-testid="landing-section"><SectionHeading eyebrow={copy.sections.faq[0]} title={copy.sections.faq[1]} /><FaqList items={[...copy.faq]} /></section>
    <BottomCta copy={copy.cta} classesHref={l(routes.classes)} />
    <div id="footer" data-testid="landing-section"><SiteFooter locale={locale} /></div>
  </main></>;
}
