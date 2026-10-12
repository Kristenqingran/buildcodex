'use client';

import {useState} from 'react';
import {generationLanguages} from '@/lib/workbench';
import {getWorkbenchCopy} from '@/lib/workbench';
import type {Locale} from '@/lib/site-content';

export function RequirementInput({locale}: {locale: Locale}) {
  const copy = getWorkbenchCopy(locale);
  const [requirement, setRequirement] = useState('');
  const [language, setLanguage] = useState('zh-CN');
  return <section className="workbench-generation-form" aria-labelledby="requirement-input-title">
    <div className="workbench-form-heading"><div><span className="card-kicker">{copy.requirement}</span><h2 id="requirement-input-title">{copy.requirement}</h2></div><span className="pending-badge">{copy.status}</span></div>
    <textarea value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={copy.placeholder} rows={14} aria-label={copy.requirement}/>
    <div className="workbench-form-footer"><label>{copy.language}<select value={language} onChange={(event) => setLanguage(event.target.value)}>{generationLanguages.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><button type="button" disabled title={copy.pending}>{copy.generate}</button></div>
    <p className="workbench-pending-note">{copy.pending}</p>
  </section>;
}
