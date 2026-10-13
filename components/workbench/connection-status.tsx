'use client';

import {useEffect, useState} from 'react';
import {getWorkbenchCopy} from '@/lib/workbench';
import type {Locale} from '@/lib/site-content';

export function WorkbenchConnectionStatus({locale}: {locale: Locale}) {
  const copy = getWorkbenchCopy(locale);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/v1/generation/status/', {cache: 'no-store'})
      .then((response) => response.ok ? response.json() as Promise<{configured: boolean}> : Promise.reject())
      .then(({configured: isConfigured}) => { if (active) setConfigured(isConfigured); })
      .catch(() => { if (active) setConfigured(false); });
    return () => { active = false; };
  }, []);

  return <span className={configured ? 'workbench-connection-ready' : 'workbench-connection-pending'}>
    {configured ? copy.connectedStatus : copy.status}
  </span>;
}
