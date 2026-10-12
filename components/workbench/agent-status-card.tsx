import {getWorkbenchCopy} from '@/lib/workbench';
import type {Locale} from '@/lib/site-content';

export function AgentStatusCard({locale}: {locale: Locale}) {
  const copy = getWorkbenchCopy(locale);
  return <section className="workbench-status-card" aria-label={copy.agent}><div><span className="status-dot" aria-hidden="true"/><strong>{copy.agent}</strong></div><p>{copy.agentBody}</p><small>{copy.status}</small></section>;
}
