'use client';

import {useEffect, useRef, useState} from 'react';
import {generationLanguages} from '@/lib/workbench';
import {getWorkbenchCopy} from '@/lib/workbench';
import {getRequirementFileIssue, type RequirementFileIssue} from '@/lib/requirement-file';
import {extractRequirementDocument} from '@/lib/requirement-document';
import type {Locale} from '@/lib/site-content';
import type {GenerationResult} from '@/lib/testloom';
import {TestSuiteResult} from './test-suite-result';
import {WorkbenchConnectionStatus} from './connection-status';

export function RequirementInput({locale}: {locale: Locale}) {
  const copy = getWorkbenchCopy(locale);
  const [requirement, setRequirement] = useState('');
  const [language, setLanguage] = useState('zh-CN');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [state, setState] = useState<'IDLE' | 'LOADING' | 'ERROR'>('IDLE');
  const [error, setError] = useState('');
  const [configured, setConfigured] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let active = true;
    fetch('/api/v1/generation/status/', {cache: 'no-store'})
      .then((response) => response.ok ? response.json() as Promise<{configured: boolean}> : Promise.reject(new Error('status unavailable')))
      .then((status) => { if (active) { setConfigured(status.configured); setStatusChecked(true); } })
      .catch(() => { if (active) { setConfigured(false); setStatusChecked(true); } });
    return () => { active = false; };
  }, []);
  async function generate() {
    if (!configured || !requirement.trim() || state === 'LOADING') return;
    setState('LOADING'); setError(''); setResult(null);
    try {
      const response = await fetch('/api/v1/generation/', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({requirement, language})});
      const payload = await response.json() as GenerationResult & {error?: string};
      if (!response.ok) throw new Error(payload.error || 'Generation failed.');
      setResult(payload); setState('IDLE');
    } catch (cause) { setState('ERROR'); setError(cause instanceof Error ? cause.message : 'Unable to generate test cases.'); }
  }
  function fileIssueMessage(issue: RequirementFileIssue) {
    if (issue === 'unsupported') return copy.fileUnsupported;
    if (issue === 'too-large') return copy.fileTooLarge;
    if (issue === 'too-many-characters') return copy.fileTooManyCharacters;
    return copy.fileNoText;
  }
  async function importRequirementFile(file: File) {
    setFileError('');
    if (requirement.trim() && !window.confirm(copy.replaceFileConfirm)) return;
    const initialIssue = getRequirementFileIssue(file.name, file.size, '');
    if (initialIssue) { setFileError(fileIssueMessage(initialIssue)); return; }
    try {
      const text = await extractRequirementDocument(file.name, file);
      const issue = getRequirementFileIssue(file.name, file.size, text);
      if (issue) { setFileError(fileIssueMessage(issue)); return; }
      setRequirement(text);
      setSelectedFileName(file.name);
    } catch {
      setFileError(copy.fileReadFailed);
    }
  }
  const pending = configured ? copy.generate : copy.pending;
  return <section className="workbench-generation-stack" aria-labelledby="requirement-input-title">
  <section className="workbench-generation-form" aria-labelledby="requirement-input-title">
    <div className="workbench-form-heading"><div><span className="card-kicker">{copy.requirement}</span><h2 id="requirement-input-title">{copy.requirement}</h2></div><WorkbenchConnectionStatus locale={locale}/></div>
    <div className="workbench-requirement-input">
      <textarea value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={copy.placeholder} rows={14} aria-label={copy.requirement}/>
      <div className="workbench-file-row">
        <input ref={fileInputRef} className="workbench-file-input" type="file" accept=".md,.txt,.docx,.pdf,text/markdown,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" aria-label={copy.uploadRequirement} onChange={(event) => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ''; if (file) void importRequirementFile(file); }}/>
        <button type="button" className="workbench-file-button" onClick={() => fileInputRef.current?.click()}>{copy.uploadRequirement}</button>
        {selectedFileName && <span className="workbench-file-name" title={selectedFileName}>{copy.fileName}: {selectedFileName}</span>}
      </div>
      {fileError && <p className="workbench-error" role="alert">{fileError}</p>}
    </div>
    <div className="workbench-form-footer"><label>{copy.language}<select value={language} onChange={(event) => setLanguage(event.target.value)}>{generationLanguages.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><button className={state === 'LOADING' ? 'is-loading' : undefined} type="button" disabled={!statusChecked || !configured || !requirement.trim() || state === 'LOADING'} onClick={generate} title={pending} aria-busy={state === 'LOADING'}>{state === 'LOADING' ? (locale === 'zh-CN' ? '生成中…' : 'Generating…') : copy.generate}</button></div>
    {!configured && statusChecked && <p className="workbench-pending-note">{copy.pending}</p>}{state === 'ERROR' && <p className="workbench-error" role="alert">{error}</p>}
  </section>{result && <TestSuiteResult result={result} locale={locale}/>}</section>;
}
