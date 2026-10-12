import {Link} from '@/i18n/navigation';
import {getWorkbenchCopy, workbenchNavigation} from '@/lib/workbench';
import type {Locale} from '@/lib/site-content';

export function WorkbenchShell({locale, activeHref, children}: {locale: Locale; activeHref?: string; children: React.ReactNode}) {
  const copy = getWorkbenchCopy(locale);
  return <section className="workbench-frame">
    <header className="workbench-frame-header"><div><span className="card-kicker">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p></div><span className="workbench-frame-mark" aria-hidden="true">◫</span></header>
    <div className="workbench-layout">
      <aside className="workbench-sidebar" aria-label={copy.navTitle}>
        <div className="workbench-sidebar-heading"><strong>{locale === 'zh-CN' ? '导航栏' : 'Navigation'}</strong></div>
        <nav className="workbench-nav">
          <Link className={activeHref === '/workbench/' ? 'active' : undefined} href="/workbench/"><span aria-hidden="true">▦</span>{workbenchNavigation[0].label[locale]}</Link>
          <div className="workbench-nav-group"><span><span aria-hidden="true">▣</span>Agents</span><Link className={activeHref === '/workbench/test-case-generation/' ? 'active' : undefined} href="/workbench/test-case-generation/">{workbenchNavigation[1].label[locale]}</Link><span className="disabled">{locale === 'zh-CN' ? '测试用例审阅' : 'Test Case Review'}</span><span className="disabled">{locale === 'zh-CN' ? '测试用例修复' : 'Test Case Repair'}</span></div>
          <Link className={activeHref === '/workbench/test-cases/' ? 'active' : undefined} href="/workbench/test-cases/"><span aria-hidden="true">□</span>{workbenchNavigation[2].label[locale]}</Link>
          <Link className={activeHref === '/workbench/runs/' ? 'active' : undefined} href="/workbench/runs/"><span aria-hidden="true">◷</span>{workbenchNavigation[3].label[locale]}</Link>
          <span className="disabled"><span aria-hidden="true">♧</span>{locale === 'zh-CN' ? '工作流（即将推出）' : 'Workflows (Coming soon)'}</span>
        </nav>
        <div className="workbench-agent-card"><span>{copy.agent}</span><small>{copy.agentBody}</small><b>{copy.status}</b></div>
      </aside>
      <div className="workbench-content">{children}</div>
    </div>
  </section>;
}
